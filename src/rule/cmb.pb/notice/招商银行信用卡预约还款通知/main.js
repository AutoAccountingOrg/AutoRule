import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  let regex = /您尾号(\d{4})的账户信用卡预约还款人民币([\d,]+.\d{2})元/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, number, money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `招商银行[预约还款]`;
  obj.shopName = '招商银行';
  obj.shopItem = json.text;
  obj.time = json.t;
  obj.type = BillType.Transfer;
  obj.accountNameTo = `招商银行信用卡(${number})`;
  obj.accountNameFrom = `招商银行预约还款卡`;
  return obj;
}
