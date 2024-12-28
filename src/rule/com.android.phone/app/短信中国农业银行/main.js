import { formatDate, isPaymentType, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '中国农业银行';

const rules = [
  [
    /您尾号为(\d{4})的金融账户于(.*?)完成一笔(.*?)交易(.*?)([-\d,]+(.\d{2})?)，余额([\d,]+(.\d{2})?)。/,
    match => {
      let [, number, date, shopItem, , money] = match;
      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(shopItem);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'M月D日h时i分');
      obj.type = matchType;
      obj.accountNameFrom = `${senderName}(${number})`;
      return obj;
    }
  ],
  [
    /您尾号(\d{4})账户(.*?)向(.*?)完成(.*?)交易人民币([-\d,]+(.\d{2})?)，余额([\d,]+(.\d{2})?)。/,
    match => {
      let [, number, date, shopItem, shopName, money] = match;
      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(shopName);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopName = shopName;
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'M月D日h:i');
      obj.type = matchType;
      obj.accountNameFrom = `${senderName}(${number})`;
      return obj;
    }
  ],
  [
    /(.*?)于(.*?)向您尾号(\d{4})账户完成(.*?)交易人民币([-\d,]+(.\d{2}))，余额([\d,]+(.\d{2}))。/,
    match => {
      let [, name, date, number, type, money] = match;
      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(type);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopItem = type;
      obj.time = formatDate(date, 'M月D日h:i');
      obj.type = matchType;
      obj.accountNameFrom = `${senderName}(${number})`;
      obj.shopName = name;
      return obj;
    }
  ],
  [
    //您6559的信用卡(附属卡)12月20日20:01消费27.40元，可用余额57821.53元，如有外币欠款以入账为准。
    /您(\d{4})的信用卡\(附属卡\)(.*?)消费([\d,]+(.\d{2}))元，可用余额([\d,]+(.\d{2}))元，如有外币欠款以入账为准。/,
    match => {
      let [, number, date, money] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[支出]`;
      obj.shopItem = '消费';
      obj.time = formatDate(date, 'M月D日h:i');
      obj.type = 'Expend';
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
      return rule[1](match, t);
    }
  }
}
