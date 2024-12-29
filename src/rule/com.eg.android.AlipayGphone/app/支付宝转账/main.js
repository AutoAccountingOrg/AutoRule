import { AliTools, BillType, RuleObject, toFloat } from 'common/index.js';

function income (pl, t) {
  let obj = new RuleObject(BillType.Income);
  obj.time = t;
  let extras = JSON.parse(pl.extraInfo);
  obj.shopName = extras.assistMsg1;
  obj.money = toFloat(extras.content);
  obj.shopItem = pl.title;
  obj.accountNameFrom = '支付宝余额';

  if (pl.title.indexOf('提现') !== -1) {
    obj.type = BillType.Transfer;
    obj.channel = `支付宝[转账-提现]`;
  } else if (pl.title.indexOf('转账成功') !== -1 || pl.title.indexOf('Transfer successful') !== -1) {
    obj.type = BillType.Expend;
    AliTools.handleContentItems(JSON.parse(pl.content).content, obj);
    obj.channel = `支付宝[转账-支出]`;
  } else {
    obj.channel = `支付宝[转账-收入]`;
  }

  return obj;
}

export function get (data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.link.indexOf('bizType=D_TRANSFER') !== -1) {
    return income(pl, t);
  }
  return null;
}
