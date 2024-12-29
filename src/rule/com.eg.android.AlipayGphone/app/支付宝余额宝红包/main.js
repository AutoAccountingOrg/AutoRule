import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.homePageTitle.indexOf('红包奖励发放') !== -1) {
    let obj = new RuleObject(BillType.Income);

    obj.channel = `支付宝[余额宝-红包]`;

    let content = JSON.parse(pl.content);
    obj.money = toFloat(content.money);
    obj.shopName = '余额宝';
    obj.shopItem = pl.title;
    obj.time = t;
    obj.type = BillType.Income;
    obj.accountNameFrom = '余额宝';

    return obj;
  }
  return null;
}
