import { BillType, RuleObject, splitSms, toFloat } from 'common/index.js';

let rules = [
  {
    // *辉您公积金账号[尾号6864]于10月30日缴存2186元，余额12611.76元。【泉州公积金中心】
    'regex': /(.*?)您公积金账号\[尾号(\d+)\]于(.*?)缴存(.*?)元，余额(.*?)元。【泉州公积金中心】/,
    'match': (match, t) => {
      let [, shopName, number, date, money, shopItem] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `泉州公积金中心[收入]`;
      obj.shopName = shopName;
      obj.shopItem = `余额：${shopItem}`;
      obj.time = t;

      obj.type = BillType.Income;

      obj.accountNameFrom = `泉州公积金中心(${number})`;
      return obj;
    }

  }
];

export function get (data) {
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== '福建12329') {
    return null;
  }
  for (let rule of rules) {
    const match = text.match(rule.regex);
    if (match) {
      return rule.match(match, t);
    }
  }
}
