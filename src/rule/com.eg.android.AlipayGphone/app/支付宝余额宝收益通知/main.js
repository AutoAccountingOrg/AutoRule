import { BillType, RuleObject, toFloat } from 'common/index.js';

function income(pl,t){
  let obj = new RuleObject(BillType.Income);
  obj.money = toFloat(pl.content);
  obj.channel = `支付宝[余额宝-收入]`;
  obj.shopName = pl.title;
  obj.time = t;
  let extras = JSON.parse(pl.extraInfo);
  obj.shopItem = `${extras.leftSubContent}(${extras.assistMsg1})`
  obj.accountNameFrom = '余额宝';
  return obj;
}

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.link.indexOf('YEB_INTEREST_INCOME_NOTIFY') !== -1) {
    return income(pl, t);
  }
  return null;
}
