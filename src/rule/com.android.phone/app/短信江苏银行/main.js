import { BillType, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';
export function get(data) {
  let { sender,bankName,text,t } = splitSms(data);
  if (bankName !== "江苏银行") return null;
  //您的信用卡6706于9月26日存入1795.68元。上期账单已还清。
  let regex  = /您的信用卡(\d{4})于(.*?)存入([\d,]+.\d{2})元。(.*?)。/;
  const match = text.match(regex);
  if (!match) return null;
  let [,number,date,money,shopItem] = match;

  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `江苏银行信用卡[还款]`;
  obj.shopName ="江苏银行信用卡";
  obj.shopItem = shopItem;
  obj.time = formatDate(date,"M月D日");

  obj.type = BillType.Transfer

  obj.accountNameTo = `江苏银行信用卡(${number})`;
  return obj;
}
