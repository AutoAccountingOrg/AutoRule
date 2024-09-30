import { BillType, formatDate, RuleObject, toFloat } from 'common/index.js';

// 您账户6598于09月19日08:46在【财付通-理财通-腾安基金销售（深圳）有限公司】发生快捷支付扣款，人民币2500.00


export function get(data) {
  let json = JSON.parse(data)
  // 【美团月付】成功支付126.00元
 // let regex  = /您尾号(\d{4})的招行一卡通入账人民币([\d,]+.\d{2})元/
  let regex = /【美团月付】成功支付([\d,]+.\d{2})元/
  const match = json.title.match(regex);
  if (!match) {
    return null;
  }
  let [,money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `美团月付[支出]`;
  obj.shopName ="美团";
  obj.shopItem = json.text;
  obj.time = formatDate();

  obj.type = BillType.Expend

  obj.accountNameFrom = `美团月付`;
  return obj;
}
