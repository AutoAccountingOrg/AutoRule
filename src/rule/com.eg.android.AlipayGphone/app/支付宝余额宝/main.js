import { RuleObject, BillType, Currency, toFloat, AliTools } from 'common/index.js';


function autoTransfer(pl,t){
  let obj = new RuleObject(BillType.Transfer);

  obj.channel = `支付宝[余额宝-转入]`;

  let content = JSON.parse(pl.content);
  obj.money = toFloat(content.money);
  obj.shopName = "余额宝";
  obj.shopItem = pl.title;
  obj.time = t;
  obj.accountNameFrom = '支付宝余额';
  obj.accountNameTo = '余额宝';
  return obj;

}

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
  } else if (pl.link.indexOf('bizType=YEB') !== -1) {
    return autoTransfer(pl, t);
  }
  return null;
}
