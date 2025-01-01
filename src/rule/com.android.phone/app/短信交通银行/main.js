import { formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '交通银行';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 您尾号0262交行信用卡01日19时09分成功消费人民币153.00元，当前可用额度为人民币53948.90元。【交通银行】
    /您尾号(\d{4})交行信用卡(\d+日\d+时\d+分)成功消费人民币(.*?)元，当前可用额度为人民币(.*?)元。/,
    match => {
      let [, number, date, money, balance] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[消费]`;
      obj.shopItem = '信用卡消费';
      obj.time = formatDate(date, 'D日h时i分');
      obj.type = 'Expend';
      obj.accountNameFrom = `${senderName}信用卡(${number})`;
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
