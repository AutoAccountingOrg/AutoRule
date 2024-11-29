import { AliTools, BillType, RuleObject, toFloat } from 'common/index.js';

function expend(pl,t){
  let obj = new RuleObject(BillType.Expend);

  obj.channel = `支付宝[消费-支出]`;

  let content = JSON.parse(pl.content);

  AliTools.handleContentItems(content.content, obj);
  obj.time = t;
  obj.money =  toFloat(content.money);
  obj.shopItem = obj.shopItem || pl.homePageTitle;

  let extras = JSON.parse(pl.extraInfo);
  obj.shopName = obj.shopName || extras.sceneExt2.sceneName;

  if (obj.shopName.indexOf("蚂蚁财富")!==-1){
    obj.type = BillType.Transfer;
    obj.accountNameTo = "支付宝基金"
  }

  return obj;
}



export function get(data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.title.indexOf('付款成功') !== -1 || pl.title.indexOf('自动扣款') !== -1 || pl.title.indexOf('Payment successful') !== -1) {
    return expend(pl, t);
  }

  return null;
}
