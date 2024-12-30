import { formatDate, isPaymentType, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '重庆银行';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //【重庆银行】您尾号8863卡2024年12月18日12月份加班补贴转账存入人民币708.00元,余额人民币25115.44元
    /您尾号(\d{4})卡(\d{4}年\d+月\d+日)(.*?)人民币(.*?)元,余额人民币(.*?)元/,
    match => {
      let [, number, date, type, money] = match;

      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(type);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopItem = type;
      obj.time = formatDate(date, 'Y年M月D日');
      obj.type = matchType;
      obj.accountNameFrom = `${senderName}(${number})`;
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
