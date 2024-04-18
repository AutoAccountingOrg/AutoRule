import { DataType } from './utils/DataType';
import ruleModules from './utils/RuleModules';

const data = window.data || '';
const dataType = window.dataType || 0;
const app = window.app || 'default';

let type = 'app';

switch (dataType) {
  case DataType.App:
    type = 'app';
    break;
  case DataType.Helper:
    type = 'helper';
    break;
  case DataType.Notice:
    type = 'notice';
    break;
  case DataType.Sms:
    type = 'sms';
    break;
  default:
    type = 'app';
    break;
}

for (const moduleName in ruleModules) {
  const module = ruleModules[moduleName];
  const findName = `${type}/${app}`;
  if (moduleName.indexOf(findName) !== -1) {
    let result = null;
    try {
      result = module.get(data);
      if (result !== null && result.money !== null && parseFloat(result.money) > 0) {
        result.ruleName = moduleName.replace(findName, '').replace('main.js', '').replaceAll('/', '');
        print(JSON.stringify(result));
        break;
      }
    } catch (e) {}
  }
}
