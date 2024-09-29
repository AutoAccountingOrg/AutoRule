import { AliTools, BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';


// 您账户6598于09月19日08:46在【财付通-理财通-腾安基金销售（深圳）有限公司】发生快捷支付扣款，人民币2500.00


export function get(data) {
  let json = JSON.parse(data)
  // 您账户6598于09月19日08:46在【财付通-理财通-腾安基金销售（深圳）有限公司】发生快捷支付扣款，人民币2500.00
  let regex = /您账户(\d{4})于(.*?)在【(.*)-(.*?)】发生快捷支付扣款，(.*?)([\d,]+.\d{2})/
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [,number,time,shopName,shopItem,currency,money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `招商银行[消费]`;
  obj.currency = Currency[currency]
  obj.shopName =shopName;
  obj.shopItem = shopItem;
  obj.time = formatDate(time,"M月D日h:i");
  if (shopName.indexOf("理财通")!==-1){
    obj.accountNameTo = "腾讯理财通账户"
    obj.type = BillType.Transfer
  }else{
    obj.type = BillType.Expend
  }

  obj.accountNameFrom = `招商银行(${number})`;
  return obj;
}
