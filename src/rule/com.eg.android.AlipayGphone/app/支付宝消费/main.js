import { AliTools, BillType, Currency, RuleObject, stripHtml, toFloat } from 'common/index.js';

function expend(pl,t){
  let obj = new RuleObject(BillType.Expend);

  obj.channel = `支付宝[消费-支出]`;

  let content = JSON.parse(pl.content);

  AliTools.handleContentItems(content.content, obj);
  obj.time = t;
  obj.money =  toFloat(content.money);
  obj.shopItem = obj.shopItem || pl.homePageTitle;
  return obj;
}



export function get(data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.title.indexOf('付款成功') !== -1 || pl.title.indexOf('自动扣款') !== -1) {
    return expend(pl, t);
  }

  return null;
}
