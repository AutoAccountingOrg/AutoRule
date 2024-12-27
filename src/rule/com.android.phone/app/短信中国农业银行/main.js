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
    //苟先生于12月23日10:28向您尾号2473账户完成转存交易人民币60000.00，余额60234.76。
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
