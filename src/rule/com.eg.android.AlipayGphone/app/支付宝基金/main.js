import { BillType, RuleObject, toFloat } from 'common/index.js';

function income(pl,t){
  let obj = new RuleObject(BillType.Income);

  obj.channel = `支付宝[基金-收入]`;

  let extras = JSON.parse(pl.extraInfo);

  obj.shopName = extras.assistMsg1;
  obj.shopItem = extras.content;
  obj.money = toFloat(extras.assistMsg2);
  obj.time = t;

  obj.accountNameFrom = extras.assistMsg3;
  if (obj.accountNameFrom === '银行卡') {
    obj.accountNameFrom = '支付宝基金银行卡';
  }

  return obj;
}

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.link.indexOf('transaction_detail') !== -1) {
    return income(pl, t);
  }
  return null;
}
