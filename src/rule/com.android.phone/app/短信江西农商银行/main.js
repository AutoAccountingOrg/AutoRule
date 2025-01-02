import { BillType, Currency, formatDate, isPaymentType, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '江西农商银行';

const rules = [
  [
    // 转入规则
    /(.*?)于(.*?)向您尾号(\d{4})账户转入(.*?)([\d,]+(.\d{2}))元，余额.*?元。/,
    match => {
      let [, shopName, date, number, currency, money] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[收入]`;
      obj.shopName = shopName;
      obj.currency = Currency[currency];
      obj.time = formatDate(date, 'D日h时i分');
      obj.type = BillType.Income;
      obj.accountNameFrom = `${senderName}(${number})`;
      return obj;
    }
  ],
  [
    // 转出规则
    /您尾号(\d{4})账户于(.*?)向(.*?)转出(.*?)([\d,]+(.\d{2}))元，余额.*?元。/,
    match => {
      let [, number, date, shopName, currency, money] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[支出]`;
      obj.shopName = shopName;
      obj.currency = Currency[currency];
      obj.time = formatDate(date, 'D日h时i分');
      obj.type = BillType.Expend;
      obj.accountNameFrom = `${senderName}(${number})`;
      return obj;
    }
  ],
  [
    // 您尾号0058的账户29日17时27分绩效补贴(转入)人民币2,896.00元
    /您尾号(\d{4})的账户(\d+日\d+时\d+分)(.*?)人民币([\d,]+(.\d{2}))元，余额.*?元。/,
    match => {
      let [, number, date, type, money] = match;
      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(type);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopItem = type;
      obj.time = formatDate(date, 'D日h时i分');
      obj.type = matchType;
      obj.accountNameFrom = `${senderName}(${number})`;
      return obj;
    }
  ]
];

export function get (data) {
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== senderName) {
    return null;
  }
  for (let rule of rules) {
    const match = text.match(rule[0]);
    if (match) {
      return rule[1](match);
    }
  }
}
