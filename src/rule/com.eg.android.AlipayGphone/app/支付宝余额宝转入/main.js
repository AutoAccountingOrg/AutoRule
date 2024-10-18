import { AliTools, BillType, RuleObject, toFloat } from 'common/index.js';

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.title.indexOf('余额宝-单次转入') !== -1) {
    let obj = new RuleObject(BillType.Transfer);

    obj.channel = `支付宝[余额宝-转入]`;

    let content = JSON.parse(pl.content);
    AliTools.handleContentItems(content.content, obj);
    obj.money = toFloat(content.money);
    obj.shopName = "余额宝";
    obj.shopItem = pl.title;
    obj.time = t;
    obj.accountNameTo = '余额宝';


    return obj;
  }
  return null;
}
