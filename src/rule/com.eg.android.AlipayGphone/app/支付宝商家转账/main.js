import { BillType, RuleObject, toFloat } from 'common/index.js';

function income (pl, t) {
  let obj = new RuleObject(BillType.Income);
  obj.time = t;
  let content = JSON.parse(pl.content);
  obj.shopName = content.content[0].content;
  obj.money = toFloat(content.money);
  obj.shopItem = content.status;
  obj.accountNameFrom = '支付宝余额';

  obj.channel = `支付宝[转账-收入]`;

  return obj;
}

export function get (data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.link.indexOf('bizType=BIZFUND') !== -1 && pl.title.indexOf('收到一笔转账') !== -1) {
    return income(pl, t);
  }
  return null;
}
