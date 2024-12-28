import { Octokit } from '@octokit/rest';
import https from 'https';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import chalk from 'chalk';
import dayjs from 'dayjs';

import { DEEPSEEK_API_KEY, GITHUB_TOKEN } from './env.js';

// 创建 Octokit 实例
const octokit = new Octokit({
  auth: GITHUB_TOKEN // 需要替换成你的 GitHub token
});

// 仓库信息
const owner = 'AutoAccountingOrg';
const repo = 'AutoRule';

// 添加日志输出函数
const log = {
  info: (message) => {
    console.log(`${chalk.gray(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`)} ${chalk.blue('[INFO]')} ${message}`);
  },
  success: (message) => {
    console.log(`${chalk.gray(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`)} ${chalk.green('[SUCCESS]')} ${message}`);
  },
  error: (message) => {
    console.log(`${chalk.gray(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`)} ${chalk.red('[ERROR]')} ${message}`);
  },
  warn: (message) => {
    console.log(`${chalk.gray(`[${dayjs().format('YYYY-MM-DD HH:mm:ss')}]`)} ${chalk.yellow('[WARN]')} ${message}`);
  }
};

// 文件操作相关函数
const fileUtils = {
  ensureDirectoryExists: (dirPath) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      log.success(`已创建目录: ${dirPath}`);
    }
  },

  writeFile: (fileName, content) => {
    const dirPath = path.dirname(fileName);
    try {
      fileUtils.ensureDirectoryExists(dirPath);
      fs.writeFileSync(fileName, content);
      log.success(`文件已成功写入: ${fileName}`);
    } catch (error) {
      log.error('创建文件失败:', error);
      process.exit(1);
    }
  },

  getRuleNames: (prefix) => {
    try {
      const items = fs.readdirSync(prefix);
      return items
        .filter(item => fs.existsSync(path.join(prefix, item, 'tests')))
        .flatMap(rule => {
          const testsPath = path.join(prefix, rule, 'tests');
          return fs.readdirSync(testsPath).map(test => `${rule}/tests/${test}`);
        });
    } catch (error) {
      log.error('读取目录失败:', error);
      return [];
    }
  }
};

// AI 相关函数
const aiUtils = {
  async askAI (systemPrompt, userPrompt) {
    const API_URL = 'https://api.deepseek.com/v1/chat/completions';
    try {
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7
        })
      };

      const response = await new Promise((resolve, reject) => {
        const req = https.request(API_URL, {
          method: 'POST',
          headers: requestData.headers
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(e);
            }
          });
        });

        req.on('error', reject);
        req.write(requestData.body);
        req.end();
      });

      return response.choices[0].message.content;
    } catch (error) {
      log.error('调用 AI 接口出错:', error);
      return null;
    }
  }
};

// 用户交互相关函数
const userInteraction = {
  async promptForRuleName (aiSuggestion) {
    const read = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const userInput = await new Promise(resolve => {
      read.question('\n请输入新的规则名称（直接回车表示接受 AI 建议）：', answer => {
        read.close();
        resolve(answer.trim());
      });
    });

    return userInput === '' ? aiSuggestion : userInput;
  }
};

// 获取 issues 的异步函数
async function fetchIssues () {
  try {
    const response = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'open', // 只获取打开状态的 issues
      per_page: 1
    });

    // 遍历并输出每个 issue 的编号、标题和内容
    for (const issue of response.data) {
      log.info(`Issue 编号: ${issue.number}`);
      log.info(`标题: ${issue.title}`);
      log.info(`内容: ${issue.body}`);
      console.log(chalk.gray('-------------------'));
      await handleIssue(issue);
      process.exit(0);
    }

  } catch (error) {
    log.error(`获取 issues 失败: ${error}`);
  }
}

async function extractCodeBlockSync (issueContent) {
  const pattern = /\[数据过期时间：(.+?)]\((https?:\/\/[^\s)]+)\)/;
  const match = issueContent.match(pattern);

  if (match) {
    const expiryDate = match[1];
    const uri = match[2];
    log.info(`数据过期时间: ${expiryDate}`);
    log.info(`URI: ${uri}`);

    try {
      const response = await new Promise((resolve, reject) => {
        https.get(uri, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => resolve(data));
        }).on('error', reject);
      });

      log.success(`成功获取内容: ${response}`);
      return response;
    } catch (err) {
      log.error(`请求错误: ${err.message}`);
      process.exit(0);
    }
  } else {
    log.warn('没有匹配到');
    process.exit(1);
  }
}

function extractFirstPackageName (text) {
  // 定义正则表达式，适配更短的包名，如 cmb.pb
  const packageRegex = /\b[a-zA-Z]+(?:\.[a-zA-Z0-9_]+)+\b/;
  // 使用正则表达式查找第一个匹配项
  const match = text.match(packageRegex);
  // 如果匹配项存在，返回第一个；否则返回 null
  return match ? match[0] : null;
}

async function handleIssue (issue) {
  const issueContent = await extractCodeBlockSync(issue.body);
  const appName = extractFirstPackageName(issue.title);

  if (!appName) {
    log.error(`包名为空: ${issue.title}`);
    process.exit(1);
  }

  log.info(`包名: ${appName}`);
  const ruleName = await askForRuleName(appName, issueContent, issue.labels);
  log.success(`执行结束：${ruleName}`);
}

// 规则处理相关函数
const ruleUtils = {
  getRuleType (labels) {
    return labels[0].name === 'DATA' ? 'app' : 'notice';
  },

  getRulePrefix (app, type) {
    return `./src/rule/${app}/${type}/`;
  },

  async generateAIRuleName (app, content, ruleNames) {
    const props = `
    你的任务是从给你的数据中，总结出规则名称和测试用例的名称，对于微信，一般使用的是source的名称作为规则名称。

    行为准则：
    1. 规则名称和测试用例名称均使用中文；
    2. 测试用例的名称需要明确消费的类型，比如：招商银行信用卡消费通知，上海农商银行支出，中国农业银行支出，微信支付；
    3. 规则名称必须覆盖测试用例的名称并明确来源，比如：短信招商银行；
    4. 你可以参考目前已有规则名称和测试用例名称，来总结出新的规则名称和测试用例名称。
  

    数据来源：
    ${app}
    目前已有规则名称和测试用例名称：
    ${ruleNames.join('\n')}

    输出参考：
    招商银行信用卡消费通知/tests/招商银行信用卡消费.txt
    短信上海农商银行/tests/上海农商银行支出.txt
    微信公众号中国农业银行微银行/tests/中国农业银行支出.txt
    微信支付/tests/微信支付.txt
    `;

    return await aiUtils.askAI(props, content);
  },

  ensureUniqueRuleName (result, ruleNames) {
    let name = result;
    let i = 1;
    while (ruleNames.includes(name)) {
      i++;
      name = result.replace('.txt', i + '.txt');
    }
    return { name, i };
  }
};

// 文件生成相关函数
const fileGenerator = {
  async generateJsFiles (base, finalResult, content, i, type, app) {
    const mainJs = base + '/main.js';
    const mainTestJs = base + '/main.test.js';

    if (fs.existsSync(mainTestJs)) {
      await this.updateExistingJsFiles(base, mainJs, mainTestJs, finalResult, content);
    } else {
      await this.createNewJsFiles(type, app, mainJs, mainTestJs, finalResult, content);
    }
  },

  async updateExistingJsFiles (base, mainJs, mainTestJs, finalResult, content) {
    log.info(`更新已有的JS文件：${mainJs}`);
    let rules = fileUtils.getRuleNames(base);
    let system = `
    你的任务是从给定的数据中编写正则表达式，以提取关键信息。
    行为准则：
    - 测试用例的名称和测试文件中的名称对应，如果是同样类型的测试用例直接根据编号在测试用例的数组里面添加。
    - Income表示收入，Transfer表示转账，Expend表示支出
    - 参考并完善下面给出的规则提取和测试用例
    - 保持test和testAnkio函数里面的名称与当前编写的测试用例名称一致
    
    已有的测试用例：
    ${rules.join('\n')}
    以下给出的是已有的两个部分（规则提取和测试），请完善这两个部分。
    main.js
    \`\`\`
    ${fs.readFileSync(mainJs)}
     \`\`\`
    main.test.js
    \`\`\`
    ${fs.readFileSync(mainTestJs)}
     \`\`\` 
    当前编写的测试用例名称：${finalResult} 
    输出格式为：
    ====mainJs====
    完整的main.js
    ====mainTestJs====
    完整的main.test.js 
    `;
    await this.writeJsFiles(mainJs, mainTestJs, system, content);
  },

  async createNewJsFiles (type, app, mainJs, mainTestJs, finalResult, content) {
    log.info(`创建JS文件：${mainJs}`);
    let templatePath = this.getTemplatePath(type, app);
    log.info(`参考模板：${templatePath.dir}`);
    let system = `
    你的任务是从给定的数据中编写正则表达式，以提取关键信息。
    行为准则：
    - 测试用例的名称和测试文件中的名称对应，如果是同样类型的测试用例直接根据编号在测试用例的数组里面添加。
    - 参考【${templatePath.file}】的js格式进行编写
    - Income表示收入，Transfer表示转账，Expend表示支出
    - 保持test和testAnkio函数里面的名称与当前编写的测试用例名称一致

    以下给出的是【${templatePath.file}】的两个部分（规则提取和测试），请仿照这两个部分进行规则提取的编写。
    main.js
    \`\`\`
    ${fs.readFileSync(templatePath.dir + 'main.js')}
     \`\`\`
    main.test.js
    \`\`\`
    ${fs.readFileSync(templatePath.dir + 'main.test.js')}
     \`\`\` 
    当前编写的测试用例名称：${finalResult} 
    输出格式为：
    ====mainJs====
    完整的main.js
    ====mainTestJs====
    完整的main.test.js 
    `;

    await this.writeJsFiles(mainJs, mainTestJs, system, content);
  },

  async writeJsFiles (mainJs, mainTestJs, system, content) {
    let aiResult = await aiUtils.askAI(system, content);

    // 解析新的输出格式
    try {
      const mainJsMatch = aiResult.match(/====mainJs====\n([\s\S]*?)(?=====mainTestJs====)/);
      const mainTestJsMatch = aiResult.match(/====mainTestJs====\n([\s\S]*?)$/);

      if (!mainJsMatch || !mainTestJsMatch) {
        log.error('AI 输出格式不正确');
        return;
      }

      const mainJsContent = mainJsMatch[1].trim().replace('```javascript', '').replace('```', '');
      const mainTestJsContent = mainTestJsMatch[1].trim().replace('```javascript', '').replace('```', '');

      // 打印 AI 生成的结果
      log.info('\nAI 生成的 main.js 内容：');
      console.log(mainJsContent);
      log.info('\nAI 生成的 main.test.js 内容：');
      console.log(mainTestJsContent);

      // 获取用户确认
      const read = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      const confirmed = await new Promise(resolve => {
        read.question('\n请确认是否写入文件（直接回车确认，输入任意内容取消）：', answer => {
          read.close();
          resolve(answer.trim() === '');
        });
      });

      if (confirmed) {
        fs.writeFileSync(mainJs, mainJsContent);
        fs.writeFileSync(mainTestJs, mainTestJsContent);
        log.success('写入js完成');
      } else {
        log.warn('已取消写入文件');
        process.exit(0);
      }
    } catch (error) {
      log.error(`解析 AI 输出异常：${error}`);
      log.error(`AI 原始输出：${aiResult}`);
      process.exit(1);
    }
  },

  getTemplatePath (type, app) {
    if (type !== 'app') {
      return {
        file: '美团月付支出',
        dir: 'src/rule/com.sankuai.meituan/notice/美团月付支出/'
      };
    }
    if (app === 'com.android.phone') {
      return {
        file: '上海农商银行支出',
        dir: 'src/rule/com.android.phone/app/短信上海农商银行/'
      };
    }
    if (app === 'com.tencent.mm') {
      return {
        file: '上海银行收入',
        dir: 'src/rule/com.tencent.mm/app/微信公众号上海银行/'
      };
    }

    if (app === 'com.eg.android.AlipayGphone') {
      return {
        file: '支付宝消费',
        dir: 'src/rule/com.eg.android.AlipayGphone/app/支付宝消费/'
      };
    }
    return {
      file: app === 'com.tencent.mm' ? '上海银行收入' : '上海农商银行支出',
      dir: app === 'com.tencent.mm'
        ? 'src/rule/com.tencent.mm/app/微信公众号上海银行/'
        : 'src/rule/com.android.phone/app/短信上海农商银行/'
    };
  }
};

// 重构后的主函数
async function askForRuleName (app, content, labels) {
  const type = ruleUtils.getRuleType(labels);
  const prefix = ruleUtils.getRulePrefix(app, type);
  const ruleNames = fileUtils.getRuleNames(prefix);

  // 生成规则名称
  const result = await ruleUtils.generateAIRuleName(app, content, ruleNames);
  const { name, i } = ruleUtils.ensureUniqueRuleName(result, ruleNames);

  // 显示建议的规则名称
  log.info('\nAI 建议的规则名称：');
  log.info(name);

  // 获取用户确认
  const finalResult = await userInteraction.promptForRuleName(name);
  log.success(`最终结果: ${finalResult}`);

  // 写入文件
  const fileName = prefix + finalResult;
  fileUtils.writeFile(fileName, content);

  // 生成相关的 JS 文件
  const base = path.dirname(path.dirname(fileName));
  await fileGenerator.generateJsFiles(base, finalResult, content, i, type, app);

  return finalResult;
}

// 执行函数
await fetchIssues();


