import { BillType, RuleObject, toFloat } from 'common/index.js';

function expend (pl, t) {
  let obj = new RuleObject(BillType.Expend);

  obj.channel = `支付宝[易校园-支出]`;

  let content = JSON.parse(pl.extraInfo);

  obj.time = t;
  obj.money = toFloat(content.assistMsg2);
  obj.shopItem = content.assistMsg1;

  obj.shopName = content.title;

  obj.accountNameFrom = '支付宝（易校园）';

  return obj;
}

export function get (data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.title.indexOf('易校园') !== -1 && pl.content.indexOf('消费成功通知') !== -1) {
    return expend(pl, t);
  }

  return null;
}
