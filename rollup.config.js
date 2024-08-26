import path from 'path';
import fs from 'fs';
import { createFilter } from '@rollup/pluginutils';
import { terser } from 'rollup-terser';
import babel from '@rollup/plugin-babel';

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
const utilsFolder = path.join('src', 'utils');
const ruleFiles = getRuleFiles(rulesFolder);
const externalFilter = createFilter([], [], {
  resolve: false,
});
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
    plugins: [
      terser(),
      // resolve('', ''), // 解析 node_modules 中的模块
      // commonjs(), // 将 CommonJS 模块转换为 ES6 模块
      babel({
        babelHelpers: 'bundled', // Babel 帮助程序类型
        exclude: 'node_modules/**', // 排除 node_modules 目录
        presets: [
          '@babel/preset-env', // 使用 Babel 预设
        ],
      }),
    ],
    external: id => externalFilter(id),
  };
});
// 删除dist文件夹
// 如果dist文件夹存在就删除文件夹
// TODO
try {
  fs.rmSync(path.join('dist'), { recursive: true });
} catch (e) {}
// 创建dist文件夹
fs.mkdirSync(path.join('dist'), { recursive: true });
// 将规则信息写入rules.json文件
fs.writeFileSync(
  path.join('dist', 'rules.json'),
  JSON.stringify(rules, null, 2),
);
let moduleName = 'common';
outputs.push({
  input: path.join('src', 'utils', 'index.js'),
  output: {
    file: path.join('dist', `${moduleName}.js`), // 输出文件路径
    format: 'iife', // 输出格式为 IIFE
    name: moduleName, // 全局变量名
    footer: `
          let BillType = ${moduleName}.BillType;
          let Currency = ${moduleName}.Currency;
          let DataType = ${moduleName}.DataType;
          let RuleObject = ${moduleName}.RuleObject;
          let Html = {
          findNonEmptyString: ${moduleName}.findNonEmptyString,
          stripHtml: ${moduleName}.stripHtml,
          };
          let Number = {
          toDoubleFloat: ${moduleName}.toDoubleFloat,
          toFloat: ${moduleName}.toFloat,
          };
          let Time ={
          formatDate: ${moduleName}.formatDate,
          isTimeInRange: ${moduleName}.isTimeInRange,
          };
      `,
  },
  plugins: [
    terser(),
    babel({
      babelHelpers: 'bundled', // Babel 帮助程序类型
      exclude: 'node_modules/**', // 排除 node_modules 目录
      presets: [
        '@babel/preset-env', // 使用 Babel 预设
      ],
    }),
  ],
});

outputs.push({
  input: path.join('src', 'category', 'main.js'),
  output: {
    file: path.join('dist', `category.js`), // 输出文件路径
    format: 'iife', // 输出格式为 IIFE
    name: 'category', // 全局变量名
  },
  plugins: [terser()],
});

export default outputs;
