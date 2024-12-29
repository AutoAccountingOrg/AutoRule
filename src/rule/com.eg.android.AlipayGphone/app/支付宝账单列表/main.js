import { AliTools, BillType, RuleObject } from 'common/index.js';

/**
 * 解析支付宝账单数据
 * @param {string} data - 包含支付宝账单数据的JSON字符串
 * @returns {RuleObject|null} - 解析后的规则对象，如果解析失败则返回null
 */
export function get (data) {
  // 解析数据
  let json = JSON.parse(data);
  if (!json.extension || !json.fields) {
    return null;
  }

  let obj = new RuleObject();

  AliTools.handleBillItems(json.fields, obj);
  processBizType(json.extension, obj, json);

  return obj;
}

/**
 * 处理业务类型并更新结果对象
 * @param {Object} extension - 扩展数据对象
 * @param {Object} result - 结果对象
 * @returns {boolean} - 处理结果
 */
function processBizType (extension, result, json) {
  switch (extension.bizType) {
    case 'CHARGE':
      result.accountNameFrom = result.accountNameFrom || '支付宝余额';
      result.channel = '支付宝[收钱码服务费]';
      break;
    case 'TRADE':
      result.accountNameFrom = result.accountNameFrom || '支付宝余额';
      result.channel = '支付宝[普通交易]';
      result.shopItem = result.shopItem || (json.innerLoopModelView && json.innerLoopModelView.params.consumeTitle) || '';
      break;
    case 'D_TRANSFER':
      result.accountNameFrom = result.accountNameFrom || '支付宝余额';
      result.channel = '支付宝[转账收款]';
      break;
    case 'YEB':
      if (result.shopItem.indexOf('奖励') !== -1) {
        result.type = BillType.Income;
        result.accountNameFrom = '余额宝';
      } else {
        result.accountNameTo = '余额宝';
      }

      result.channel = '支付宝[余额宝转账]';
      break;
    case 'MINITRANS':
      result.type = BillType.Income;
      result.accountNameFrom = result.accountNameFrom || '余额宝';
      result.channel = '支付宝[余额宝收益]';
      break;
    case 'ISASP':
      result.channel = '支付宝[医保支付]';
      break;
    case 'PCC':
      result.shopItem = result.shopItem || (json.bizBillViewModel.title) || '信用卡还款';
      result.channel = '支付宝[还款]';
      break;
    default:
      return false;
  }
  return true;
}
