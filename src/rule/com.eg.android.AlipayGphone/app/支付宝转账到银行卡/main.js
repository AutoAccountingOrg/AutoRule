import { AliTools, BillType, RuleObject, toFloat } from 'common/index.js';

function autoTransfer(pl,t){
  let obj = new RuleObject(BillType.Transfer);

  obj.channel = `支付宝[转账到银行卡]`;

  let content = JSON.parse(pl.content);
  obj.money = toFloat(content.money);
  obj.shopName = "转账到银行卡";
  obj.shopItem = pl.title;
  obj.time = t;
  obj.accountNameFrom = '支付宝余额';
  AliTools.handleContentItems(content.content, obj);

  return obj;

}


export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.title.indexOf('转出到账成功') !== -1) {
    return autoTransfer(pl, t);
  }
  return null;
}
