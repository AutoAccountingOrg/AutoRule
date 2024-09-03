import { AliTools, BillType, RuleObject, toFloat } from 'common/index.js';

function handleFundTransfer(pl, t) {
  let obj = new RuleObject(BillType.Income);
  obj.money = toFloat(pl.content);
  obj.channel = `支付宝[小荷包-收入]`;

  let extras = JSON.parse(pl.extraInfo);

  obj.shopName = extras.assistMsg1;
  obj.accountNameFrom = `支付宝小荷包(${extras.assistMsg1})`;
  obj.shopItem = extras.content;

  obj.time = t;

  return obj;
}

function autoIncome(pl, t) {
  let obj = new RuleObject(BillType.Transfer);

  obj.channel = `支付宝[小荷包-收入]`;

  let content = JSON.parse(pl.content);

  obj.money = toFloat(content.money);

  AliTools.handleContentItems(content.content, obj);

  obj.shopItem = pl.title;
  obj.time = t;

  obj.accountNameTo = obj.shopName;

  return obj;
}

function handleAnt (pl,t) {
  let obj = new RuleObject(BillType.Income);

  obj.channel = `支付宝[小荷包-收入]`;

  let extras = JSON.parse(pl.extraInfo);
  obj.money = toFloat(extras.content);
  obj.shopName = extras.assistMsg1;
  obj.accountNameFrom = `支付宝小荷包(${extras.assistMsg1})`;
  obj.shopItem = extras.homePageTitle;

  obj.time = t;

  return obj;
}

export function get(data) {
  let json = JSON.parse(data)[0];
  let pl = JSON.parse(json.pl);
  let t = json.mct;
if (pl.title.indexOf('支付宝小荷包') ===-1)return null;

  if (pl.title.indexOf('自动攒') !== -1) {
    return autoIncome(pl, t);
  } else if (pl.content.indexOf('小荷包转入') !== -1 ) {
    return handleFundTransfer(pl, t);
  } else if (pl.templateName.indexOf('蚂蚁合花') !== -1) {
    return handleAnt(pl, t);
  }

  return null;
}
