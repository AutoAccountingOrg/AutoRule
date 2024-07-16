import path from 'path';
import fs from 'fs';
import { createFilter } from '@rollup/pluginutils';
import { terser } from 'rollup-terser';

// 递归地获取所有规则文件
function getRuleFiles(dirPath) {
  let files = [];

  fs.readdirSync(dirPath).forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      files = files.concat(getRuleFiles(filePath)); // 递归获取子文件夹中的文件
    } else if (file.endsWith('.js') && !file.endsWith('.test.js')) {
      files.push(filePath);
    }
  });

  return files;
}
const rulesFolder = path.join('src', 'rule');
const ruleFiles = getRuleFiles(rulesFolder);
const externalFilter = createFilter([], null, { resolve: false });
const rules = [];
const outputs = ruleFiles.map(file => {
  const ruleChineseName = path.basename(path.dirname(file));
  const ruleApp = path.basename(path.dirname(path.dirname(file)));
  const ruleType = path.basename(
    path.dirname(path.dirname(path.dirname(file))),
  );
  const ruleName = 'rule_' + rules.length;
  const out = `${ruleType}/${ruleApp}/${ruleChineseName}.js`;
  rules.push({
    ruleName,
    ruleChineseName,
    ruleApp,
    ruleType,
    path: out,
  });
  return {
    input: file,
    output: {
      file: path.join('dist', out), // 使用父文件夹名称作为输出文件名
      format: 'iife',
      name: ruleName, // 使用父文件夹名称作为全局变量名
      //  exports: 'none', // 禁止导出模块的方式
      //  banner: `let ${ruleName} = {};`,
      // footer: `let ${ruleName} = ${ruleName};`, // 将变量暴露到全局对象 window 上
    },
    plugins: [terser()],
    external: id => externalFilter(id),
  };
});
// 删除dist文件夹
fs.rmdirSync(path.join('dist'), { recursive: true });
// 创建dist文件夹
fs.mkdirSync(path.join('dist'), { recursive: true });
// 将规则信息写入rules.json文件
fs.writeFileSync(
  path.join('dist', 'rules.json'),
  JSON.stringify(rules, null, 2),
);

outputs.push({
  input: path.join('src', 'utils', 'index.js'),
  output: {
    file: path.join('dist', 'common.js'), // 输出文件路径
    format: 'iife', // 输出格式为 IIFE
    name: 'common', // 全局变量名
    footer: `
          let BillType = common.BillType;
          let Currency = common.Currency;
          let DataType = common.DataType;
          let RuleObject = common.RuleObject;
          let findNonEmptyString = common.findNonEmptyString;
          let formatDate = common.formatDate;
          let isTimeInRange = common.isTimeInRange;
          let stripHtml = common.stripHtml;
          let toDoubleFloat = common.toDoubleFloat;
          let toFloat = common.toFloat;
      `,
  },
  plugins: [
    terser(),
    {
      name: 'process-code', // 插件名称
    },
  ],
  //external: id => externalFilter(id),
});

export default outputs;
