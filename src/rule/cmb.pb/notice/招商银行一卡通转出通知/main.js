import { AliTools, BillType, formatDate, RuleObject, toFloat } from 'common/index.js';


// 您尾号0877的招行一卡通转出人民币5650.00元 


export function get(data) {
  let json = JSON.parse(data)
  // 您尾号0877的招行一卡通转出人民币5650.00元 
  let regex = /您尾号(\d{4})的招行一卡通转出人民币([\d,]+.\d{2})/
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [,number,money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `招商银行[消费]`;
  obj.time = formatDate('', "M月D日h:i");
  obj.type = BillType.Transfer

  obj.accountNameFrom = `招商银行(${number})`;
  return obj;
}
