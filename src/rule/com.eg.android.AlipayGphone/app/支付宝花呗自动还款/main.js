import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  //非花呗不管，排除花呗金
  if (!pl.templateName.match(/花呗还款日当天/)) {
    return null;
  }

  let t = json.mct;
  //这里只有消费的记录，所以先按照消费计算
  let obj = new RuleObject();

  let extras = JSON.parse(pl.extraInfo);

  obj.money = toFloat(extras.assistMsg2);
  obj.channel = `支付宝[花呗-还款]`;
  obj.shopName = pl.templateName;
  obj.shopItem = extras.content;
  obj.time = t;
  obj.accountNameFrom = extras.assistMsg1;
  obj.accountNameTo = '支付宝花呗';
  obj.type = BillType.Transfer;
  return obj;
}
