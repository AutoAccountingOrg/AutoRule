import { BillType, RuleObject, toFloat } from 'common/index.js';

// 您账户6598于09月19日08:46在【财付通-理财通-腾安基金销售（深圳）有限公司】发生快捷支付扣款，人民币2500.00

export function get (data) {
  let json = JSON.parse(data);
  // 【美团月付】退款通知
  if (json.title !== '【美团月付】退款通知') {
    return null;
  }

  let regex = /(.*?)退款成功，([\d,]+.\d{2})元已退回美团月付，并抵扣\d+月账单。点击查看详情>/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, shopItem, money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `美团月付[退款]`;
  obj.shopName = '美团';
  obj.shopItem = shopItem;
  obj.time = json.t;

  obj.type = BillType.Income;

  obj.accountNameFrom = `美团月付`;
  return obj;
}
