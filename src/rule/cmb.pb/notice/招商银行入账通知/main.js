import { AliTools, BillType, formatDate, RuleObject, toFloat } from 'common/index.js';


// 您账户6598于09月19日08:46在【财付通-理财通-腾安基金销售（深圳）有限公司】发生快捷支付扣款，人民币2500.00


export function get(data) {
  let json = JSON.parse(data)
  // 您尾号6598的招行一卡通入账人民币1442.00元
 // let regex = /您账户(\d{4})于(.*?)在【(.*)-(.*?)】发生快捷支付扣款，人民币([\d,]+.\d{2})/
  let regex  = /您尾号(\d{4})的招行一卡通入账人民币([\d,]+.\d{2})元/
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [,number,money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `招商银行[入账]`;
  obj.shopName ="招行一卡通";
  obj.shopItem = "入账";
  obj.time = formatDate();

  obj.type = BillType.Income

  obj.accountNameFrom = `招商银行(${number})`;
  return obj;
}
