import { BillType, RuleObject, toFloat } from 'common/index.js';

function expend (pl, t) {
  let obj = new RuleObject(BillType.Expend);

  obj.channel = `支付宝[生活缴费小程序]`;

  let extraInfo = JSON.parse(pl.extraInfo);

  obj.time = t;
  obj.money = toFloat(extraInfo.assistMsg1);
  obj.shopItem = extraInfo.assistMsg4;

  obj.shopName = extraInfo.assistMsg5;

  return obj;
}

export function get (data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.title.indexOf('生活缴费小程序') !== -1 && pl.content.indexOf('缴费成功') !== -1) {
    return expend(pl, t);
  }

  return null;
}
