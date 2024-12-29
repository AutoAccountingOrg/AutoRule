import { BillType, Currency, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 您尾号0877的招行一卡通转出人民币5650.00元
  let regex = /您尾号(\d{4})的招行一卡通转出(.*?)([\d,]+.\d{2})元/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, number, currency, money] = match;

  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `招商银行[转账]`;
  obj.shopName = '招行一卡通';
  obj.shopItem = '转账';
  obj.currency = Currency[currency];
  obj.time = json.t;

  obj.type = BillType.Transfer;

  obj.accountNameFrom = `招商银行(${number})`;
  return obj;
}
