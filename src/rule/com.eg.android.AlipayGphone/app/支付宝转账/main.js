import { BillType, RuleObject, toFloat } from 'common/index.js';

function income(pl,t){
  let obj = new RuleObject(BillType.Income);

  obj.channel = `支付宝[转账-收入]`;

  obj.time = t;
  let extras = JSON.parse(pl.extraInfo);
  obj.shopName =extras.assistMsg1 ;
  obj.money = toFloat(extras.content);
  obj.shopItem = pl.title
  obj.accountNameFrom = '支付宝余额';
  return obj;
}

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.link.indexOf('bizType=D_TRANSFER') !== -1) {
    return income(pl, t);
  }
  return null;
}
