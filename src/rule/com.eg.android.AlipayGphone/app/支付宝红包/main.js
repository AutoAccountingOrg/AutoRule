import { BillType, RuleObject, stripHtml, toFloat } from 'common/index.js';

function income(templateJson,t){
  var dataItems = JSON.parse(templateJson);

  let obj = new RuleObject(BillType.Income);

  obj.channel = `支付宝[红包-收入]`;

  obj.time = t;
  obj.shopName = stripHtml(dataItems.subtitle);
  obj.money =  toFloat(dataItems.statusLine1Text);
  obj.shopItem = dataItems.title;
  obj.accountNameFrom = '支付宝余额';
  return obj;
}



export function get(data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.templateJson !== null) {
    return income(pl.templateJson, t);
  }

  return null;
}
