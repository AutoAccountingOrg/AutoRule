import { formatDate, isPaymentType, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '浦发银行';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 您尾号4036卡人民币活期14:09转入9,915.48元[其他代发工资],可用余额105,047.59元。【浦发银行】
    /您尾号(\d{4})卡人民币活期(\d+:\d+)转入(.*?)元\[(.*?)\],可用余额(.*?)元。/,
    match => {
      let [, number, time, money, type, balance] = match;

      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(type);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopItem = type;
      obj.time = formatDate(time, 'h:i');
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
