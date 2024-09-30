import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

export function get(data) {
  let { sender,bankName,text,t } = splitSms(data);
  if (bankName !== "招商银行") return null;
  // 您账户6598于09月26日12:20向尾号为1356的信用卡还款人民币322261.60元，收款人收拾收拾，请以收款人实际入账为准
  let regex  = /您账户(\d{4})于(.*?)向尾号为(\d{4})的信用卡还款(.*?)([\d,]+.\d{2})元，收款人(.*?)，请以收款人实际入账为准/;
  const match = text.match(regex);
  if (!match) return null;
  let [,number,date,toNumber,currency,money,shopName] = match;

  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `招商银行[还款]`;
  obj.shopName =shopName;
  obj.shopItem = "信用卡还款";
  obj.currency = Currency[currency];
  obj.time = formatDate(date,"M月D日h:i");

  obj.type = BillType.Transfer

  obj.accountNameFrom = `招商银行(${number})`;
  obj.accountNameTo = `招商银行信用卡(${toNumber})`;
  return obj;
}
