import path from 'path';
import fs from 'fs';

const { execSync } = require('child_process');
 execSync('yarn dev', { "stdio": 'inherit' });

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
  fs.readFileSync(path.join(distDirPath, 'rules.json'), 'utf8')
);

for (const rule of rules) {
  js += fs.readFileSync(path.join(distDirPath, rule.path), 'utf8');
}

js += `
let window  = {};
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
  fileName => path.extname(fileName) === '.json'
);

// 读取每个.json文件的内容
const jsonFilesContent = jsonFileNames.map(jsonFileName => {
  const jsonFilePath = path.join(tests, jsonFileName);
  const jsonFileContent = fs.readFileSync(jsonFilePath, 'utf8');
  return JSON.parse(jsonFileContent);
});

test('App规则调用校验', () => {
  //读取dist目录下所有的json
  let total = []
  jsonFilesContent.forEach(jsonFileContent => {
    const { name, results, datas, type, app } = jsonFileContent;
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const data = datas[i];
      total.push(name);
      function print(callbackResult) {

        total = total.filter(item => item !== name);

        console.log("callbackResult: "+name,callbackResult)
        let json = JSON.parse(callbackResult);
        json.time = 0;
        result.time = 0;
        expect(json).toEqual(result);
      }

        let code =js + `
        window.data = ${JSON.stringify(data)};
        const data = window.data || '';

const rules = window.rules || [];

for (const rule of rules) {
  let result = null;
    try{
    result = rule.obj.get(data);
    }catch(e){
     // console.log("error",e);
      continue;
    }
    if (
      result !== null &&
      result.money !== null &&
      parseFloat(result.money) > 0
    ) {
   
      print(JSON.stringify(result));
      break;
    }
  
}

        `
        eval(code);

    }
  });
  if (total.length > 0) {
    console.log(total);
    throw new Error('测试用例未全部执行=> ' + total);
  }
});
