import { formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '湖南农信';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //【湖南农信】您的福祥贷记卡（尾号0000)于12月30日发生一笔消费，金额000.00元。更多服务请关注“湖南农信信用卡”官方微信
    /您的福祥贷记卡（尾号(\d{4})\)于(\d+月\d+日)发生一笔消费，金额(.*?)元。/,
    match => {
      let [, number, date, money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[消费]`;
      obj.shopItem = '消费';
      obj.time = formatDate(date, 'M月D日');
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
