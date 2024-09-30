import { RuleObject, toFloat } from 'common/index.js';

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  //非亲情卡不管
  if (
    pl.title.indexOf('亲情卡') === -1) {
    return null;
  }

  let t = json.mct;
  //这里只有消费的记录，所以先按照消费计算
  let obj = new RuleObject();

  obj.money = toFloat(pl.homePageTitle);
  obj.channel = `支付宝[亲情卡-消费]`;
  obj.shopName = pl.templateName;
  obj.shopItem = pl.content;
  obj.time = t;
  obj.accountNameFrom = '支付宝亲情卡';
  return obj;
}
