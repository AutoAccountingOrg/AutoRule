import { formatDate, isPaymentType, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '重庆公积金中心';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //【重庆公积金中心】您的个人账户于2024年12月13日汇缴公积金1980元,汇缴年月为202412, 余额9900元。
    /您的个人账户于(\d{4}年\d{1,2}月\d{1,2}日)(.*?)公积金(.*?)元,汇缴年月为(\d{6}), 余额(.*?)元。/,
    match => {
      let [, date, type, money, month, balance] = match;

      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(type);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopItem = type;
      obj.time = formatDate(date, 'Y年M月D日');
      obj.type = matchType;
      obj.accountNameFrom = `${senderName}`;
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
