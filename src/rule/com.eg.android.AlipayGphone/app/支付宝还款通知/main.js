import { AliTools, BillType, RuleObject, toFloat } from 'common/index.js';

function transaction (content, t) {

  let obj = new RuleObject(BillType.Transfer);

  obj.money = toFloat(content.money);

  obj.time = t;

  AliTools.handleContentItems(content.content, obj);

  obj.channel = '支付宝[还款成功]';

  obj.shopItem = content.date;

  obj.shopName = content.status;

  return obj;
}

export function get (data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (['还款成功', '还款到账成功'].includes(pl.title) === false) {
    return null;
  }
  let content = JSON.parse(pl.content);
  return transaction(content, t);
}
