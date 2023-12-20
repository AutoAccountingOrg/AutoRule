import {DataType} from "./utils/DataType";
import ruleModules from "./utils/RuleModules";

const json = json || {}
const dataType = dataType || 0
const app = app || ""

for (const moduleName in ruleModules) {
    const module = ruleModules[moduleName];
    if(module.app() === app){
        let result = null;
        if(
            (moduleName.startsWith("app_") &&dataType === DataType.App) ||
            (moduleName.startsWith("helper_") &&dataType === DataType.Helper) ||
            (moduleName.startsWith("notice_") &&dataType === DataType.Notice) ||
            (moduleName.startsWith("sms_") &&dataType === DataType.Sms)
        ){
             result = module.get();
        }
        if(result!==null){
            result.ruleName = module.name();
            console.log(JSON.stringify(result));
            break;
        }
    }
}



