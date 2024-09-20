import path from 'path';
import fs from 'fs';
import { createFilter } from '@rollup/pluginutils';
import { terser } from 'rollup-terser';
import babel from '@rollup/plugin-babel';

let babelConfig = {
  'babelHelpers': 'bundled',  // 保持这个配置
  'exclude': 'node_modules/**'
};

// 递归地获取所有规则文件
function getRuleFiles (dirPath) {
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
path.join('src', 'utils');
const ruleFiles = getRuleFiles(rulesFolder);
createFilter([], [], {
  'resolve': false
});
const rules = [];
const outputs = ruleFiles.map(file => {
  const ruleChineseName = path.basename(path.dirname(file));
  const ruleType = path.basename(path.dirname(path.dirname(file)));
  const ruleApp = path.basename(path.dirname(path.dirname(path.dirname(file))));
  const ruleName = 'rule_' + rules.length;
  const out = `${ruleType}/${ruleApp}/${ruleChineseName}.js`;
  rules.push({
    ruleName,
    ruleChineseName,
    ruleApp,
    ruleType,
    'path': out
  });

  return {
    'input': file,
    'output': {
      'file': path.join('dist', out), // 使用父文件夹名称作为输出文件名
      'format': 'iife',
      'name': ruleName, // 使用父文件夹名称作为全局变量名
      'globals': {
        'common/index.js': 'common'
      }
    },

    'external': [
      'common/index.js'
    ],
    'plugins': [
      babel(babelConfig),
      terser()
    ]
  };
});
// 删除dist文件夹
// 如果dist文件夹存在就删除文件夹
try {
  fs.rmSync(path.join('dist'), { 'recursive': true });
} catch (e) {
}
// 创建dist文件夹
fs.mkdirSync(path.join('dist'), { 'recursive': true });
// 将规则信息写入rules.json文件
fs.writeFileSync(
  path.join('dist', 'rules.json'),
  JSON.stringify(rules, null, 2)
);
let moduleName = 'common';
outputs.push({
  'input': path.join('src', 'utils', 'index.js'),
  'output': {
    'file': path.join('dist', `${moduleName}.js`), // 输出文件路径
    'format': 'iife', // 输出格式为 IIFE
    'name': moduleName // 全局变量名
  },
  'plugins': [
    babel(babelConfig),
    terser()
  ]
});

outputs.push({
  'input': path.join('src', 'category', 'main.js'),
  'output': {
    'file': path.join('dist', `category.js`), // 输出文件路径
    'format': 'iife', // 输出格式为 IIFE
    'name': 'category', // 全局变量名
    'globals': {
      'common/index.js': 'common'
    }
  },

  'external': [
    'common/index.js'
  ],
  'plugins': [
    babel(babelConfig),
    terser()]
});

function putCategoryNames () {
  const file = path.join('src', 'category', 'main.js');
  fs.readFile(file, function(error, data) {
    const content = data.toString();
    const regex = /["']([\u4e00-\u9fa5]+)["']/g;
    let match;
    let results = [];

    while ((match = regex.exec(content)) !== null) {
      results.push(match[1]);  // match[1] 包含了捕获组中的中文字符串
    }
    results = results.filter(item => item !== '默认账本');
    //results去重
    results = [...new Set(results)];

    //写入文件
    fs.writeFileSync(
      path.join('dist', 'category.json'),
      JSON.stringify(results, null, 2)
    );
  });

}

putCategoryNames();

export default outputs;
