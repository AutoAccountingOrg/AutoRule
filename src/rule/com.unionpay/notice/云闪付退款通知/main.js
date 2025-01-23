import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 您尾号为6048的银行卡于19日19时10分退款203.36元
  let regex = /您尾号为(\d{4})的银行卡于(\d{1,2})日(\d{1,2})时(\d{1,2})分退款([\d,]+.\d{2})元/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, cardLast4, day, hour, minute, money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `云闪付[退款]`;
  obj.shopName = '云闪付';
  obj.shopItem = '退款';
  obj.time = json.t;

  obj.type = BillType.Income;

  obj.accountNameFrom = `银行卡尾号${cardLast4}`;
  return obj;
}
