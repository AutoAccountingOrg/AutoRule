import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';




export function get(data) {
  let json = JSON.parse(data)
  // 信用卡通知：您尾号1356的招行信用卡消费6225.34人民币。
  let regex = /信用卡通知：您尾号(\d{4})的招行信用卡消费([\d,]+.\d{2})(.*?)。/
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [,number,money,currency] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `招商银行[信用卡消费]`;
  obj.currency = Currency[currency]
  obj.shopName = '';
  obj.shopItem = '';
  obj.time = json.t;
  obj.type = BillType.Expend

  obj.accountNameFrom = `招商银行信用卡(${number})`;
  return obj;
}
