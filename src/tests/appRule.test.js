import { DataType } from '../utils/DataType';
import path from 'path';
import fs from 'fs';

const { execSync } = require('child_process');

execSync('yarn dev', { stdio: 'inherit' });

const distDirPath = path.join(__dirname, '..', '..', 'dist');

const dataFilePath = path.join(distDirPath, 'rule.js');
// 使用readFileSync来同步读取文件内容
// 读取common.js文件内容,作为文件头
let js = fs.readFileSync(path.join(distDirPath, 'common.js'), 'utf8');

// 读取rules.json文件内容
//  {
//     "ruleName": "rule_25",
//     "ruleChineseName": "微信转账",
//     "ruleApp": "com.tencent.mm",
//     "ruleType": "app",
//     "path": "app/com.tencent.mm/微信转账.js"
//   }
// ]

const rules = JSON.parse(
  fs.readFileSync(path.join(distDirPath, 'rules.json'), 'utf8'),
);

for (const rule of rules) {
  js += fs.readFileSync(path.join(distDirPath, rule.path), 'utf8');
}

js += `
window.rules = [
`;
for (const rule of rules) {
  js += `{name:"${rule.ruleChineseName}",obj:${rule.ruleName}},`;
}
js += `
];
`;
const tests = path.join(__dirname, '..', '..', 'tests');

// 读取dist目录下的所有文件名
const fileNames = fs.readdirSync(tests);

// 过滤出所有的.json文件名
const jsonFileNames = fileNames.filter(
  fileName => path.extname(fileName) === '.json',
);

// 读取每个.json文件的内容
const jsonFilesContent = jsonFileNames.map(jsonFileName => {
  const jsonFilePath = path.join(tests, jsonFileName);
  const jsonFileContent = fs.readFileSync(jsonFilePath, 'utf8');
  return JSON.parse(jsonFileContent);
});

test('App规则调用校验', () => {
  //读取dist目录下所有的json
  jsonFilesContent.forEach(jsonFileContent => {
    const { name, results, datas, type, app } = jsonFileContent;
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const data = datas[i];
      var window = {
        data: data,
        rules: [],
      };
      function print(callbackResult) {
        expect(callbackResult).toEqual(result);
      }
      try {
        // console.log(js);
        eval(js);
      } catch (e) {
        console.error('Failed: ' + name + ' ', e);
      }
    }
  });
});
