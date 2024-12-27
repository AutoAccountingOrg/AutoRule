import { formatDate, isPaymentType, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '广东华兴银行';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //【广东华兴银行】您尾号8665账户于2024年12月20日17:37消费支出人民币428.00元，余额36151.12元。
    /您尾号(\d{4})账户于(\d+年\d+月\d+日\d+:\d+)(.*?)人民币(.*?)元，余额(.*?)元。/,
    match => {
      let [, number, date, type, money] = match;

      let obj = new RuleObject();

      let { matchType, typeName } = isPaymentType(type);

      obj.money = toFloat(money);
      obj.channel = `${senderName}[${typeName}]`;
      obj.shopItem = type;
      obj.time = formatDate(date, 'Y年M月D日h:i');
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


