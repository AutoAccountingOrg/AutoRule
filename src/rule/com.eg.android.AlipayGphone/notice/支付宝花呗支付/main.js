import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 你有一笔43.73元的支出，点击领取4个支付宝积分。使用花呗支付，请及时还款。
  let regex = /你有一笔([\d,]+.\d{2})元的支出，点击领取\d+个支付宝积分。使用花呗支付，/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `支付宝花呗[支出]`;
  obj.shopName = '支付宝';
  obj.shopItem = json.text;
  obj.time = json.t;

  obj.type = BillType.Expend;

  obj.accountNameFrom = `支付宝花呗`;
  return obj;
}
