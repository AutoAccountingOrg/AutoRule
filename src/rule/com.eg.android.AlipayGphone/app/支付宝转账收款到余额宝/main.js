import { BillType, RuleObject, toFloat } from 'common/index.js';

function autoTransfer (pl, t) {
  let obj = new RuleObject(BillType.Transfer);

  obj.channel = `支付宝[余额宝-转入]`;

  let content = JSON.parse(pl.content);
  obj.money = toFloat(content.money);
  obj.shopName = '余额宝';
  obj.shopItem = pl.title;
  obj.time = t;
  obj.accountNameFrom = '支付宝余额';
  obj.accountNameTo = '余额宝';

  return obj;

}

export function get (data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.homePageTitle.indexOf('转账收款到余额宝') !== -1) {
    return autoTransfer(pl, t);
  }
  return null;
}
