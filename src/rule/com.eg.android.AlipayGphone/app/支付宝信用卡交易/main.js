import { BillType, RuleObject, toFloat } from 'common/index.js';

function transaction (extras, t, accountNameFrom) {

  let typeName = extras.assistMsg1;

  let shopName = extras.assistMsg3;

  let money = toFloat(extras.assistMsg4);

  let shopItem = extras.assistMsg5;

  let type = BillType.Expend;
  if (['退货'].includes(typeName)) {
    type = BillType.Income;
  }
  return new RuleObject(
    type,
    money,
    shopName,
    shopItem,
    accountNameFrom,
    '',
    0.0, 'CNY',
    t, '支付宝[信用卡交易提醒]'
  );
}

export function get (data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
  if (pl.title.indexOf('信用卡交易提醒') === -1) {
    return null;
  }
  let extras = JSON.parse(pl.extraInfo);
  return transaction(extras, t, pl.bizName);
}
