import { AliTools, BillType, RuleObject, toFloat } from 'common/index.js';

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  //余额宝-小猪攒钱罐-自动攒入
  if (
    pl.title.indexOf('余额宝-小猪攒钱罐-自动攒入') === -1) {
    return null;
  }

  let t = json.mct;
  let obj = new RuleObject();

  let content = JSON.parse( pl.content);
  AliTools.handleContentItems(content.content, obj);
  obj.money = toFloat(content.money);
  obj.channel = `支付宝[余额宝-小猪攒钱罐]`;
  obj.time = t;
  obj.type = BillType.Transfer;
  obj.accountNameTo = '支付宝余额宝';
  obj.shopItem = '小猪攒钱罐';
  return obj;
}
