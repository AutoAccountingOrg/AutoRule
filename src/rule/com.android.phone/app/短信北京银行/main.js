import { BillType, RuleObject, splitSms, toFloat } from 'common/index.js';

let rules = [
  {
    // 您账户0561于11月6日13:03通过财付通支付1.00元。活期余额13773.30元。对方户名:微信红包。
    'regex':
      /您账户(\d{4})于(.*?)通过(.*?)支付(.*?)元。活期余额(.*?)元。对方户名:(.*?)。/,
    'match': (match, t) => {
      let [, number, date, shopItem, money, , shopName] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);

      let type = BillType.Expend;
      let typeName = '支出';
      obj.channel = `北京银行[${typeName}]`;
      obj.shopItem = shopItem;
      obj.time = t;
      obj.shopName = shopName;

      obj.type = type;

      obj.accountNameFrom = `北京银行(${number})`;
      return obj;
    }
  }
];

export function get (data) {
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== '北京银行') {
    return null;
  }
  for (let rule of rules) {
    const match = text.match(rule.regex);
    if (match) {
      return rule.match(match, t);
    }
  }
}
