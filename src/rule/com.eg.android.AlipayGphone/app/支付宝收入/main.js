import { AliTools, BillType, RuleObject, toFloat } from 'common/index.js';

function income(pl,t){
  let obj = new RuleObject(BillType.Income);

  obj.channel = `支付宝[消费-收入]`;

  let content = JSON.parse(pl.content);

  AliTools.handleContentItems(content.content, obj);
  obj.time = t;
  obj.money =  toFloat(content.money);
  obj.shopItem = obj.shopItem || pl.homePageTitle;
  obj.shopName = obj.shopName || pl.title;
  obj.accountNameFrom = obj.accountNameFrom || '支付宝余额';
  return obj;
}


export function get(data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
   if (pl.homePageTitle.indexOf('收到一笔奖励') !== -1 || pl.title.indexOf('资金到账通知') !== -1  || pl.title.indexOf('退款通知') !== -1) {
    return income(pl, t);
  }

  return null;
}
