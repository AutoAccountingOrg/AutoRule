import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  if (pl.link.indexOf('alipay-yulibao') === -1) {
    return null;
  }
  let t = json.mct;
  let obj = new RuleObject(BillType.Income);
  obj.money = toFloat(pl.content);
  obj.channel = `支付宝[余利宝-收入]`;
  obj.shopName = pl.title;
  obj.time = t;
  let extras = JSON.parse(pl.extraInfo);
  obj.shopItem = `${extras.leftSubContent}(${extras.assistMsg1})`
  obj.accountNameFrom = '余利宝';
  return obj;
}
