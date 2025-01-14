import { BillType, RuleObject, toFloat } from 'common/index.js';

function transfer (pl, t) {
  let obj = new RuleObject(BillType.Transfer);

  obj.channel = `支付宝[花呗主动还款]`;

  let extras = JSON.parse(pl.extraInfo);

  obj.time = t;
  obj.money = toFloat(extras.assistMsg2.replace('元', ''));
  obj.shopName = extras.sceneExt.sceneName;
  obj.shopItem = pl.homePageTitle;
  obj.accountNameFrom = extras.assistMsg1;
  obj.accountNameTo = '花呗';

  return obj;
}

export function get (data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.title.indexOf('花呗') !== -1 && pl.templateName.indexOf('主动还款') !== -1) {
    return transfer(pl, t);
  }

  return null;
}
