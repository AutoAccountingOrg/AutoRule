import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';
// {"title":"招商银行","text":"您尾号6598的招行一卡通入账人民币1442.00元",t}
export function get(data) {
  let json = JSON.parse(data)
  // 您尾号6598的招行一卡通入账人民币1442.00元
  let regex  = /您尾号(\d{4})的招行一卡通入账(.*?)([\d,]+.\d{2})元/
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [,number,currency,money] = match;

  if (money <= 0)return null;

  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `招商银行[入账]`;
  obj.shopName ="招行一卡通";
  obj.shopItem = "入账";
  obj.currency = Currency[currency];
  obj.time = json.t;

  obj.type = BillType.Income

  obj.accountNameFrom = `招商银行(${number})`;
  return obj;
}
