import fs from 'fs';
import { exec } from 'child_process';
import { Octokit } from '@octokit/rest';
import https from 'https';

// 假设你通过GitHub API获取了issue的内容
async function getIssueContent () {
  // 示例：你可以通过GitHub Actions输入来获取issue内容
  return process.env.ISSUE_BODY;
}

// 提取``` ```之间的内容
async function extractCodeBlockSync (issueContent) {
  const pattern = /\[数据过期时间：(.+?)]\((https?:\/\/[^\s)]+)\)/;
  const match = issueContent.match(pattern);

  if (match) {
    const expiryDate = match[1];
    const uri = match[2];
    console.log(`数据过期时间: ${expiryDate}`);
    console.log(`URI: ${uri}`);

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

      console.log('获取的内容:', response);
      return response;
    } catch (err) {
      console.error('请求错误:', err.message);
      process.exit(0);
    }
  } else {
    console.log('没有匹配到');
    process.exit(0);
  }
}

// 写入到src/rule/tests.txt
function writeToFile (content) {
  const filePath = 'src/rule/tests.txt';
  fs.writeFileSync(filePath, content);
  console.log(`写入内容到: ${filePath}`);
}

async function buildRules () {
  return new Promise((resolve, reject) => {
    exec('yarn rollup -c', (error, stdout, stderr) => {
      if (error) {
        console.error(`执行yarn命令出错: ${error}`);
        process.exit(1);
        return reject(stderr);
      }
      console.log('yarn命令执行完成');
      resolve(stdout);
    });
  });
}

// 执行yarn build && yarn quickTest
function runYarnCommands () {
  return new Promise((resolve, reject) => {
    exec('yarn quickTest', (error, stdout, stderr) => {
      if (error) {
        console.error(`执行yarn命令出错: ${error}`);
        //process.exit(1);
        return reject(stderr);
      }
      console.log('yarn命令执行完成');
      resolve(stdout);
    });
  });
}

// 检测执行结果，提取===========START===========和===========END===========之间的内容
function extractTestResult (output) {
  const match = output.match(/===========START===========([\s\S]*?)===========END===========/);
  return match ? match[1].trim() : null;
}

// 给issue打标签并关闭issue
async function handleIssue (issueNumber, resultContent) {
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
  const owner = process.env.GITHUB_REPOSITORY_OWNER;
  const repo = process.env.GITHUB_REPOSITORY.replace(`${owner}/`, '');

  // 添加duplicate标签
  await octokit.issues.addLabels({
    owner,
    repo,
    issue_number: issueNumber,
    labels: ['duplicate']
  });

  // 在issue下添加评论
  await octokit.issues.createComment({
    owner,
    repo,
    issue_number: issueNumber,
    body: `该数据已适配，以下为自动识别的结果:\n如果在自动记账中没有识别请尝试长按更新按钮更新规则或者等待规则更新。\n\`\`\`\n${resultContent}\n\`\`\``
  });

  // 关闭issue
  await octokit.issues.update({
    owner,
    repo,
    issue_number: issueNumber,
    state: 'closed'
  });
}

// 主流程
async function processIssue () {
  try {
    const issueContent = await getIssueContent();
    const codeBlock = await extractCodeBlockSync(issueContent);

    // 将提取到的代码块写入文件
    writeToFile(codeBlock);

    // 执行yarn命令
    const output = await runYarnCommands();

    // 检查yarn命令的输出
    const result = extractTestResult(output);
    const issueNumber = process.env.ISSUE_NUMBER;

    if (result) {
      // 如果提取到测试结果，则打标签并关闭issue
      await handleIssue(issueNumber, result);
    } else {
      console.log('未找到===========START===========和===========END===========之间的内容');
    }
  } catch (error) {
    console.error(`处理issue出错: ${error.message}`);
    process.exit(1);
  }
}

async function processAll () {
  try {
    const token = process.env.GITHUB_TOKEN;
    const octokit = new Octokit({ auth: token });
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner: process.env.GITHUB_REPOSITORY_OWNER,
      repo: process.env.GITHUB_REPOSITORY.split('/')[1],
      state: 'open'
    });

    for (const issue of issues) {
      console.log(`Issue #${issue.number}: ${issue.title}`);
      console.log(`Content: ${issue.body}`);
      try {
        const codeBlock = await extractCodeBlockSync(issue.body);
        writeToFile(codeBlock);

        const output = await runYarnCommands();
        const result = extractTestResult(output);

        if (result) {
          await handleIssue(issue.number, result);
        } else {
          console.log('未找到===========START===========和===========END===========之间的内容');
        }
      } catch (e) {
        console.log(`处理issue出错：${issue.number}`);
      }
    }
  } catch (error) {
    console.error(`Error fetching issues: ${error.message}`);
    process.exit(1);
  }
}

await buildRules();
// 执行主流程
if (process.env.TYPE === "ALL"){
  await processAll()
}else{
  await processIssue();
}

