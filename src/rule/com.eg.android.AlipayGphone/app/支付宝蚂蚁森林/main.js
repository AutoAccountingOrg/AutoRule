import { BillType, RuleObject, toFloat } from 'common/index.js';

function income (pl, t) {
  let obj = new RuleObject(BillType.Income);

  obj.channel = `支付宝[蚂蚁森林-收入]`;

  let content = JSON.parse(pl.content);
  let extras = JSON.parse(pl.extraInfo);

  obj.time = t;
  obj.money = toFloat(content);
  obj.shopName = extras.sceneExt.sceneName;
  obj.shopItem = pl.homePageTitle;
  obj.accountNameFrom = '支付宝余额';

  return obj;
}

export function get (data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.title.indexOf('蚂蚁森林') !== -1 && pl.homePageTitle.indexOf('光伏治沙现金奖励提醒') !== -1) {
    return income(pl, t);
  }

  return null;
}
