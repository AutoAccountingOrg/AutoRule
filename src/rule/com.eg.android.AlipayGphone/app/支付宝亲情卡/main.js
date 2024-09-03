import { RuleObject, BillType, Currency, toFloat, AliTools } from 'common/index.js';

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  //这里只有消费的记录，所以先按照消费计算
  let obj = new RuleObject();
  let content = JSON.parse(pl.content);
  obj.money = toFloat(content.money);
  obj.channel = `支付宝[亲情卡-消费]`;
  obj.shopItem = pl.title;
  obj.time = t;
  AliTools.handleContentItems(content.content, obj);
  return obj;
}
