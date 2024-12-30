import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 您尾号为2473的农行借记卡于12月30日10:52发生一笔收入90000.00元，详情请点击
  let regex = /您尾号为(\d{4})的农行借记卡于(\d{2}月\d{2}日\d{2}:\d{2})发生一笔收入([\d,]+.\d{2})元/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, account, time, money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `中国农业银行[收入]`;
  obj.shopName = '中国农业银行';
  obj.shopItem = json.text;
  obj.time = json.t;

  obj.type = BillType.Income;

  obj.accountNameFrom = `中国农业银行(${account})`;
  return obj;
}
