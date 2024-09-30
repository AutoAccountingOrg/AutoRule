import { BillType, Currency, RuleObject, toDoubleFloat } from 'common/index.js';

/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  let json = JSON.parse(data);
  if (json.retcode !== 0) {
    return null;
  }
  let amount = toDoubleFloat(json.amount);
  let shopItem = json.wishing;
  let shopName = json.hookerUser;
  let t = parseInt(json.record[0].receiveTime) * 1000;
  return new RuleObject(
    BillType.Income,
    amount,
    shopName,
    shopItem,
    '零钱',
    '',
    0.0,
    Currency['人民币'],
    t,
    '微信[微信支付-红包收款]'
  )
}
