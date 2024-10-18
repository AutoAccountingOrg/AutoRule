import { BillType, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

let rules = [
  {
    // 您尾号为7644的银行卡于01日11时37分消费114.65元
    'regex': /您尾号为(\d{4})的银行卡于(.*?)消费([\d,]+.\d{2})元/,
    'match': (match) => {
      let [, number, date,  money, ] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `云闪付[支出]`;
      obj.time = formatDate(date, 'D日h时i分');

      obj.type = BillType.Expend;

      obj.accountNameFrom = `银行卡(${number})`;
      return obj;
    }
  }
];

export function get (data) {
  let json = JSON.parse(data);
  if (json.title !== '支付助手：付款成功') {
    return null;
  }
  for (let rule of rules) {
    const match = json.text.match(rule.regex);
    if (match) {
      return rule.match(match);
    }
  }
}
