import { formatDate, isPaymentType, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '上海农商银行';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //您账户8162于12月6日10:39汇款转出人民币1118.00元，交易后余额为17721.46元。【上海农商银行】
    /您账户(\d{4})于(\d+月\d+日\d+:\d+)(.*?)人民币(.*?)元，交易后余额为(.*?)元。/,
    match => {
      let [, number, date, type, money] = match;

      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(type);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopItem = type;
      obj.time = formatDate(date, 'M月D日h:i');
      obj.type = matchType;
      obj.accountNameFrom = `${senderName}(${number})`;
      return obj;
    }
  ],
  [
    //您账户8162于1月2日10:57行内转账转入人民币304.00元，付款方：上海虹口区江湾镇社区服务管理中心，交易后余额为24411.92元。【上海农商银行】
    /您账户(\d{4})于(\d+月\d+日\d+:\d+)(.*?)人民币(.*?)元，付款方：(.*?)，交易后余额为(.*?)元。/,
    match => {
      let [, number, date, type, money, payer] = match;

      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(type);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopItem = type;
      obj.time = formatDate(date, 'M月D日h:i');
      obj.type = matchType;
      obj.accountNameFrom = `${senderName}(${number})`;
      obj.shopName = payer;
      return obj;
    }
  ]
];

/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
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
