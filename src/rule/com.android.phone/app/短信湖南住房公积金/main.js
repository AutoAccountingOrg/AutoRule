import { formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '湖南住房公积金';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //【湖南住房公积金】【省直】尊敬的某某，您的公积金个人账户于2024年11月29日缴存1316.00元，当前余额为1527.35元。
    /【省直】尊敬的.*?，您的公积金个人账户于(\d{4}年\d+月\d+日)缴存(.*?)元，当前余额为.*?元。/,
    match => {
      let [, date, money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[收入]`;
      obj.shopItem = '公积金缴存';
      obj.time = formatDate(date, 'Y年M月D日');
      obj.type = 'Income';
      obj.accountNameFrom = `${senderName}[省直]`;
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
