import { BillType, RuleObject, toFloat } from 'common/index.js';

function transfer(pl,t){
  let obj = new RuleObject(BillType.Transfer);
  obj.money =  toFloat(pl.content);
  obj.channel = `支付宝[网商银行-转账]`;

  let extras = JSON.parse(pl.extraInfo);

  obj.time = t;

  obj.shopItem = extras.assistMsg1;
  obj.shopName = "网商银行";
  obj.accountNameFrom = `${extras.title}(${extras.assistMsg3})`;
  obj.accountNameTo = `${extras.assistMsg2}`;
  return obj;
}

function transfer2(pl,t){
  let obj = new RuleObject(BillType.Transfer);

  obj.channel = `支付宝[网商银行-余额自动转入]`;

  let extras = JSON.parse(pl.extraInfo);
  obj.money =  toFloat(extras.assistMsg1);
  obj.time = t;

  obj.shopItem = extras.content;
  obj.shopName = "网商银行";
  obj.accountNameFrom = `支付宝余额`;
  obj.accountNameTo = `网商银行`;
  return obj;
}


function expand(pl,t){
  let obj = new RuleObject(BillType.Expend);
  obj.money =  toFloat(pl.content);
  obj.channel = `支付宝[网商银行-支出]`;

  let extras = JSON.parse(pl.extraInfo);

  obj.time = t;

  obj.shopItem = extras.assistMsg1;
  obj.shopName = "网商银行";
  obj.accountNameFrom = `${extras.title}(${extras.assistMsg2})`;
  obj.accountNameTo = ``;
  return obj;
}


export function get(data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  let t = data[0].mct;
  if (pl.title.indexOf('网商银行') === -1 ) {
   return null;
  }

  if (pl.content.indexOf('做任务') !== -1){
    return null;
  }
  if (pl.homePageTitle.indexOf("余额已自动转入余利宝") !== -1){
    return transfer2(pl, t);
  }
  if (pl.homePageTitle.indexOf("转账-") !== -1){
    return transfer(pl, t);
  }
  if (pl.homePageTitle.indexOf("支付宝支付") !==-1){
    return expand(pl,t);
  }

  return null;
}
