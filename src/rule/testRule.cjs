const { join } = require('path');
const {  readFileSync } = require('fs');

const distDirPath = join(__dirname, '..', '..', 'dist');

let js = readFileSync(join(distDirPath, 'common.js'), 'utf8');

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
  readFileSync(join(distDirPath, 'rules.json'), 'utf8')
);

for (const rule of rules) {
  js += readFileSync(join(distDirPath, rule.path), 'utf8');
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
function print(callbackResult) {
  let json = JSON.parse(callbackResult);
  console.log("===========START===========")
  console.log(json);
  console.log("===========END===========")
}

let data = readFileSync(join(__dirname, 'tests.txt'), 'utf8');


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
