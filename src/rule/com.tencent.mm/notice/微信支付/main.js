import { BillType, RuleObject, toFloat, transferCurrency } from 'common/index.js';

export function get(data) {
  let json = JSON.parse(data)
  if (json.title !== "微信支付" && json.text.indexOf("已支付") === -1)return null;

  let obj = new RuleObject(BillType.Expend);

  // [4条]微信支付: 已支付¥34.88

  let index= json.text.indexOf("¥");
  let money = json.text.substring(index+1);

  obj.money = toFloat(money);
  obj.channel = `微信[微信通知-消费]`;
  obj.currency = transferCurrency("人民币");
  obj.shopName = '';
  obj.shopItem = '';
  obj.time = json.t;
  obj.type = BillType.Expend
  obj.time = json.t;
  obj.accountNameFrom = '微信支付';
  return obj;
}
