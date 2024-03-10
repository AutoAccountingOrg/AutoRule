import {DataType} from "./utils/DataType";
import ruleModules from "./utils/RuleModules";

const data = window.data || ''
const dataType = window.dataType || 0
const app = window.app || ""

for (const moduleName in ruleModules) {
    const module = ruleModules[moduleName];
    if(module.app() === app){
        let result = null;
        if(
            (moduleName.startsWith("app") &&dataType === DataType.App) ||
            (moduleName.startsWith("helper") &&dataType === DataType.Helper) ||
            (moduleName.startsWith("notice") &&dataType === DataType.Notice) ||
            (moduleName.startsWith("sms") &&dataType === DataType.Sms)
        ){
             result = module.get(data);
        }
        if(result!==null && result.money!==null  && parseFloat( result.money) > 0){
            result.ruleName = module.name();
            print(JSON.stringify(result));
            break;
        }
    }
}




