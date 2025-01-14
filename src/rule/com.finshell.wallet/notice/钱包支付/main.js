import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 消费成功
  // 本次消费：1.80 元
  let regex = /本次消费：([\d,]+.\d{2}) 元/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `OPPO/一加钱包[支出]`;
  obj.shopName = '钱包支付';
  obj.shopItem = json.text;
  obj.time = json.t;

  obj.type = BillType.Expend;

  obj.accountNameFrom = `OPPO/一加钱包`;
  return obj;
}
