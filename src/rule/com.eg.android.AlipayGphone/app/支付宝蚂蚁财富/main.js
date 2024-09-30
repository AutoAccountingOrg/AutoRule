import { BillType, RuleObject, toFloat } from 'common/index.js';

function pay(pl,t){
  let obj = new RuleObject(BillType.Income);
  if (pl.content.indexOf("∝")===-1)return null
  obj.money =  toFloat(pl.content);
  if (pl.content.indexOf("-")!==-1) {
    obj.type = BillType.Expend;
  }
  obj.channel = `支付宝[蚂蚁财富]`;

  let extras = JSON.parse(pl.extraInfo);

  obj.time = t;

  obj.shopItem = extras.assistMsg1;
  obj.shopName = extras.title;
  obj.accountNameFrom = `蚂蚁财富账户`;
  return obj;
}


export function get(data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.title.indexOf('蚂蚁财富') !== -1 ) {
    return pay(pl, t);
  }

  return null;
}
