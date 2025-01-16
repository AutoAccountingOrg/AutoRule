import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 您尾号6598的招行账户存入3000.00元成功，产品代码XDC20233622，年利率1.80%。
  let regex = /您尾号(\d{4})的招行账户存入([\d,]+.\d{2})元成功，产品代码(\w+)，年利率([\d.]+)%。/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, cardNumber, money, productCode, interestRate] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `招商银行[定存]`;
  obj.shopName = '招商银行';
  obj.shopItem = `产品代码: ${productCode}, 年利率: ${interestRate}%`;
  obj.time = json.t;

  obj.type = BillType.Transfer;

  obj.accountNameFrom = `招商银行（${cardNumber}）`;
  obj.accountNameTo = `招商银行定存`;
  return obj;
}
