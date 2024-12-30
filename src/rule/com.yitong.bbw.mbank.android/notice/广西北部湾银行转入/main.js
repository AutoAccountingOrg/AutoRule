import { BillType, RuleObject, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 您尾号9820的账户发生转入交易，人民币2065.00元
  let regex = /您尾号(\d{4})的账户发生转入交易，人民币([\d,]+.\d{2})元/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, account, money] = match;
  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `广西北部湾银行[转入]`;
  obj.shopName = '广西北部湾银行';
  obj.shopItem = json.text;
  obj.time = json.t;

  obj.type = BillType.Income;

  obj.accountNameFrom = `广西北部湾银行(${account})`;
  return obj;
}
