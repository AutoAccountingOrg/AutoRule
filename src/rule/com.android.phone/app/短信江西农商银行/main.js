import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

let rules = [
  {
    // 您尾号为6666的金融账户于09月27日09时15分完成一笔公积金付交易人民币12000.00，余额14805.04。
    // 您尾号0000账户于13日08时43分向张三转出人民币100.00元，余额1,000.00元。
    'regex': /(.*?)于(.*?)向您尾号(\d{4})账户转入(.*?)([\d,]+(.\d{2}))元，余额.*?元。/,
     'match': (match) => {
      let [, shopName, date,number, currency, money, ] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `江西农商银行[收入]`;
      obj.shopName = shopName; //13日09时58分
       obj.currency =Currency[currency]
      obj.time = formatDate(date, 'D日h时i分');

      obj.type = BillType.Income;

      obj.accountNameFrom = `江西农商银行(${number})`;
      return obj;
    }
  },
  {
    // 您尾号为6666的金融账户于09月27日09时15分完成一笔公积金付交易人民币12000.00，余额14805.04。
    // 您尾号0000账户于13日08时43分向张三转出人民币100.00元，余额1,000.00元。
    'regex': /您尾号(\d{4})账户于(.*?)向(.*?)转出(.*?)([\d,]+(.\d{2}))元，余额.*?元。/,
    'match': (match) => {
      let [, number, date,shopName, currency, money, ] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `江西农商银行[支出]`;
      obj.shopName = shopName; //13日09时58分
      obj.currency =Currency[currency]
      obj.time = formatDate(date, 'D日h时i分');

      obj.type = BillType.Expend;

      obj.accountNameFrom = `江西农商银行(${number})`;
      return obj;
    }
  },
];

export function get (data) {
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== '江西农商银行') {
    return null;
  }
  for (let rule of rules) {
    const match = text.match(rule.regex);
    if (match) {
      return rule.match(match);
    }
  }
}
