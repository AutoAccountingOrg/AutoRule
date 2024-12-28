import { RuleObject, splitSms, toFloat } from 'common/index.js';

let senderName = '抖音月付';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //【抖音月付】您已使用抖音月付下单148.00元，还款日每月6日，如有疑问点击 https://z.douyin.com/VT2x
    /您已使用抖音月付下单(.*?)元，还款日每月\d+日，如有疑问点击/,
    (match, t) => {
      let [, money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[消费]`;
      obj.shopItem = '抖音月付消费';
      obj.time = t;
      obj.type = 'Expend';
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
