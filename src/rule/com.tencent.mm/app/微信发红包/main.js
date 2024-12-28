import { BillType, Currency, RuleObject, toFloat } from 'common/index.js';

/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  let json = JSON.parse(data);
  if (json.type !== 'redPackage' || json.isSend !== 1) {
    return null;
  }
  let amount = toFloat(json.cachedPayMoney);
  let content = JSON.parse(json.content);
  let shopItem = content.msg.appmsg.wcpayinfo.sendertitle;
  let shopName = json.hookerUser;
  return new RuleObject(
    BillType.Expend,
    amount,
    shopName,
    shopItem,
    json.cachedPayTools,
    '',
    0.0,
    Currency['人民币'],
    json.t,
    '微信[微信支付-发红包]'
  )
}
