import ruleModules from "../src/utils/RuleModules";
import tests from "../src/utils/RuleTests";
import {test as CategoryTest,get as CategoryGet} from "./category/CategoryMain";

function formatLocalTime() {
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentDateTime.getDate()).padStart(2, '0');
    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



console.log("\n\n===============自动记账识别规则测试====================")
let pass = 0, total = 0;
for (const moduleName in ruleModules) {
    const module = ruleModules[moduleName];
    let index = 0;
    for (const test in tests) {

        if(test.indexOf(moduleName)===-1){
            continue
        }
        const testData = tests[test].default;

        total++;
        index++;
        let result = false
       try{
            result = module.get(testData);
       }catch (e) {
           console.log(`\x1b[31m[ ${formatLocalTime()} ][ ${moduleName} ][ 用例${index} ] 测试异常! \x1b[0m`,e,testData)

       }

        if(result){
            pass++;
            console.log(`\x1b[32m[ ${formatLocalTime()} ][ ${moduleName} ][ 用例${index} ] 测试成功! \x1b[0m`,JSON.stringify(result))
        }else{
            console.log(`\x1b[31m[ ${formatLocalTime()} ][ ${moduleName} ][ 用例${index} ] 测试失败! \x1b[0m`,testData)
        }
    }
}
console.log("\n\n===============自动记账分类规则测试====================")

const list = CategoryTest();
// 遍历数据
for (const category in list) {
    if (list.hasOwnProperty(category)) {
        const transactions = list[category];
        var index = 0;
        for (const transaction of transactions) {
            total++;
            index++;

            const result = CategoryGet(transaction.money, transaction.type, transaction.shopName, transaction.shopItem, transaction.time);
            if(result.category===category){
                pass++;
                console.log(`\x1b[32m[ ${formatLocalTime()} ][ 用例${JSON.stringify(transaction)} ] 测试成功! \x1b[0m`,result)
            }else{
                console.log(`\x1b[31m[ ${formatLocalTime()} ][ 用例${JSON.stringify(transaction)} ]  测试失败! \x1b[0m`,category,result)
            }
        }
    }
}

console.log(`\n\n\x1b[33m 测试通过率：${((pass/total).toFixed(2) * 100)}%    通过数：${pass}   总数：${total} , 请务必修改完成所有冲突后再提PR!\x1b[0m`)
