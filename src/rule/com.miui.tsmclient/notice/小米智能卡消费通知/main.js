import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 刷卡完成，交易金额：2.70元
  let regex = /刷卡完成，交易金额：([\d,]+.\d{2})元/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, money] = match;
  money = toFloat(money);
  if (money === 0) {
    return null;
  }
  let obj = new RuleObject();

  obj.money = money;

  obj.channel = `小米智能卡[支出]`;
  obj.shopName = json.title;
  obj.shopItem = json.text;
  obj.time = json.t;

  obj.type = BillType.Expend;

  obj.accountNameFrom = `小米智能卡(${json.title})`;
  return obj;
}
