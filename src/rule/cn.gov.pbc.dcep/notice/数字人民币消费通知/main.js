import { BillType, RuleObject, toFloat } from 'common/index.js';

const senderName = '数字人民币';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /您的(.*?)数字人民币钱包在(.*?)支付¥([\d,]+.\d{2})/,
    (match, json) => {
      let [, card, shopName, money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[支出]`;
      obj.shopName = shopName;
      obj.time = json.t;
      obj.type = BillType.Expend;
      obj.accountNameFrom = `${senderName}(${card})`;
      return obj;
    }
  ],
  [
    /您的(.*?)钱包在(.*?)支付了¥([\d,]+.\d{2})/,
    (match, json) => {
      let [, card, shopName, money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `${senderName}[支出]`;
      obj.shopName = shopName;
      obj.time = json.t;
      obj.type = BillType.Expend;
      obj.accountNameFrom = `${senderName}(${card})`;
      return obj;
    }
  ]
];

/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  let json = JSON.parse(data);
  if (json.title !== '付款通知') {
    return null;
  }

  for (let rule of rules) {
    const match = json.text.match(rule[0]);
    if (match) {
      return rule[1](match, json);
    }
  }
  return null;
}
