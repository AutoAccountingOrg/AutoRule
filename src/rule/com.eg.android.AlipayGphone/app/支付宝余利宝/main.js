import { RuleObject, BillType, Currency, toFloat, AliTools } from 'common/index.js';

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  //这里只有消费的记录，所以先按照消费计算
  let obj = new RuleObject(BillType.Income);
  obj.money = toFloat(pl.content);
  obj.channel = `支付宝[余利宝-收入]`;
  obj.shopName = pl.title;
  obj.time = t;
  let extras = JSON.parse(pl.extraInfo);
  obj.shopItem = `${extras.leftSubContent}(${extras.assistMsg1})`
  obj.accountNameFrom = '余利宝';
  console.log(pl);
  return obj;
}
