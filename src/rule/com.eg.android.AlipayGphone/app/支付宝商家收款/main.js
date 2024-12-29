import { BillType, RuleObject, toFloat } from 'common/index.js';

function income (pl, t) {
  let obj = new RuleObject(BillType.Income);
  obj.money = toFloat(pl.content);
  obj.channel = `支付宝[商家服务-收入]`;

  let extras = JSON.parse(pl.extraInfo);

  obj.time = t;

  obj.shopItem = extras.assistMsg1;
  obj.shopName = extras.assistMsg2;
  obj.accountNameFrom = '支付宝余额';
  return obj;
}

export function get (data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.homePageTitle.indexOf('收款到账通知') !== -1) {
    return income(pl, t);
  }

  return null;
}
