import { BillType, formatDate, isPaymentType, RuleObject, splitShop, splitSms, toFloat } from 'common/index.js';

const senderName = '工商银行';

const rules = [
  [
    /尾号(\d{4})卡(\d+月\d+日\d+:\d+)(.*?)\((.*?)\)(.*?)元，余额(.*?)元/,
    match => {
      let [, number, date, type, shopItem_, money] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      let { shopName, shopItem } = splitShop(shopItem_);
      obj.shopName = shopName;
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'M月D日h:i');
      let { matchType, typeName } = isPaymentType(type);
      obj.type = matchType;
      obj.channel = `${senderName}[${typeName}]`;
      obj.accountNameFrom = `${senderName}(${number})`;
      return obj;
    }
  ],
  [
    /您的车辆\(.*?\)(.*?)在(.*?)。上述服务合计消费.*?元，您的账户（尾号：(\d{4})）已成功扣款([\d,]+.\d{2})元。为避免影响您使用(.*?)，请关注您的扣款账户情况。/,
    match => {
      let [, date, shopItem, number, money, shopName] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[ETC支出]`;
      obj.shopName = shopName;
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'Y年M月D日');
      obj.type = BillType.Expend;
      obj.accountNameFrom = `${senderName}(${number})`;
      return obj;
    }
  ],
  [
    /您的车辆（(.*?)）于(.*?)，(.*?)，共计消费([\d,]+.\d{2})元，如您有任何疑问/,
    match => {
      let [, car, date, shopItem, money] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[ETC支出]`;
      obj.shopName = car;
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'Y-M-D');
      obj.type = BillType.Expend;
      obj.accountNameFrom = `${senderName}ETC`;
      return obj;
    }
  ]
];

export function get (data) {
  data = data.replace(/【ETC通行提醒】/g, '');
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== senderName) {
    return null;
  }
  for (let [regex, handler] of rules) {
    const match = text.match(regex);
    if (match) {
      return handler(match);
    }
  }
}
