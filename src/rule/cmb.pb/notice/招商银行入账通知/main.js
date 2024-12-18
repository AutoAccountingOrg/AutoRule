import { BillType, Currency, formatDate, RuleObject, toFloat, transferCurrency } from 'common/index.js';


let rules = [
  [
    /您尾号(\d{4})的(.*?)入账(.*?)([\d,]+.\d{2})元/,
    (match,json) => {
      let [,number,cardName,currency,money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `招商银行[入账]`;
      obj.shopName =cardName;
      obj.shopItem = "入账";
      obj.currency = Currency[currency];
      obj.time = json.t;

      obj.type = BillType.Income

      obj.accountNameFrom = `招商银行(${number})`;
      return obj;
    }
  ],
  [
    // 您账户6598于10月23日13:03收款人民币8650.00
    /您账户(\d{4})于(.*?)收款(.*?)([\d,]+.\d{2})/,
    (match,json) => {
      let [,number,date,currency,money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `招商银行[收款]`;
      obj.shopItem = "入账";
      obj.currency = Currency[currency];
      obj.time = json.t;

      obj.type = BillType.Income

      obj.accountNameFrom = `招商银行(${number})`;
      return obj;
    }
  ],
]

export function get(data) {
  let json = JSON.parse(data)

  for (let [regex,handler] of rules) {
    const match = json.text.match(regex);
    if (match) {
      return handler(match,json);
    }
  }
  return null;
}
