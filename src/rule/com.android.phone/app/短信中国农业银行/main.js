import { BillType, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

let rules = [
  {
    // 您尾号为6666的金融账户于09月27日09时15分完成一笔公积金付交易人民币12000.00，余额14805.04。
    'regex':
      /您尾号为(\d{4})的金融账户于(.*?)完成一笔(.*?)交易(.*?)([\d,]+(.\d{2})?)，余额([\d,]+(.\d{2})?)。/,
    'match': (match) => {
      let [, number, date, shopItem, currency, money, ] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `中国农业银行[收入]`;
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'M月D日h时i分');

      obj.type = BillType.Income;

      obj.accountNameFrom = `中国农业银行(${number})`;
      return obj;
    }
  },
];

export function get (data) {
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== '中国农业银行') {
    return null;
  }
  for (let rule of rules) {
    const match = text.match(rule.regex);
    if (match) {
      return rule.match(match);
    }
  }
}
