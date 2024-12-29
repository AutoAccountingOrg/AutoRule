import { BillType, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

//

let rules = [
  [
    /您的信用卡(\d{4})于(.*?)存入([\d,]+.\d{2})元。(.*?)。/,
    match => {
      let [, number, date, money, shopItem] = match;
      let obj = new RuleObject();
      obj.money = toFloat(money);
      obj.channel = `江苏银行信用卡[还款]`;
      obj.shopName = '江苏银行信用卡';
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'M月D日');

      obj.type = BillType.Transfer;

      obj.accountNameTo = `江苏银行信用卡(${number})`;
      return obj;
    }
  ],
  [
    /您的信用卡(\d{4})于(.*?)消费([\d,]+.\d{2})，关注江苏银行微信公众号，绑定信用卡可获笔笔消费免费动账微信提醒。/,
    match => {
      let [, number, date, money] = match;
      let obj = new RuleObject();
      obj.money = toFloat(money);
      obj.channel = `江苏银行信用卡[消费]`;
      obj.time = formatDate(date, 'M月D日');

      obj.type = BillType.Expend;

      obj.accountNameTo = `江苏银行信用卡(${number})`;
      return obj;
    }
  ]
];

export function get (data) {
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== '江苏银行') {
    return null;
  }
  for (let [regex, handler] of rules) {
    const match = text.match(regex);
    if (match) {
      return handler(match);
    }
  }
  return null;
}
