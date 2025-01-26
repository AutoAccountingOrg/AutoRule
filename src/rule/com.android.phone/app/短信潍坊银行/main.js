import { formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '潍坊银行';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //【潍坊银行】您尾号754的账户在01月25日10:31支取人民币2000.00。余额1968.17（本机构已参加存款保险）
    /您尾号(\d{3})的账户在(\d+月\d+日\d+:\d+)支取人民币(.*?)。余额/,
    match => {
      let [, number, date, money, balance] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[支出]`;
      obj.shopItem = '支取';
      obj.time = formatDate(date, 'M月D日h:i');
      obj.type = 'Expend';
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
