import { BillType, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

let rules = [
  {
    // 您尾号为6666的金融账户于09月27日09时15分完成一笔公积金付交易人民币12000.00，余额14805.04。
    // 您尾号为2666的金融账户于11月18日13时03分完成一笔消费交易人民币-400.00，余额2.26。
    // 您尾号0773账户10月06日15:03向湖北良品铺子电子商务有限公司完成支付宝交易人民币-18.90，余额4834.48。
    'regex':
      /您尾号为(\d{4})的金融账户于(.*?)完成一笔(.*?)交易(.*?)([-\d,]+(.\d{2})?)，余额([\d,]+(.\d{2})?)。/,
    'match': (match) => {
      let [, number, date, shopItem, currency, money, ] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);

      let type = BillType.Expend;
      let typeName = "支出";
      if (money.indexOf("-")===-1){
        typeName = "收入"
        type=BillType.Income
      }
      obj.channel = `中国农业银行[${typeName}]`;
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'M月D日h时i分');

      obj.type = type;

      obj.accountNameFrom = `中国农业银行(${number})`;
      return obj;
    }
  },
  {
    // 您尾号为6666的金融账户于09月27日09时15分完成一笔公积金付交易人民币12000.00，余额14805.04。
    // 您尾号为2666的金融账户于11月18日13时03分完成一笔消费交易人民币-400.00，余额2.26。
    // 您尾号0773账户10月06日15:03向湖北良品铺子电子商务有限公司完成支付宝交易人民币-18.90，余额4834.48。
    'regex': /您尾号(\d{4})账户(.*?)向(.*?)完成(.*?)交易人民币([-\d,]+(.\d{2})?)，余额([\d,]+(.\d{2})?)。/,
    'match': (match) => {
      let [, number, date, shopItem,shopName, money, ] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      let type = BillType.Expend;
      let typeName = "支出";
      if (money.indexOf("-")===-1){
        typeName = "收入"
        type=BillType.Income
      }
      obj.channel = `中国农业银行[${typeName}]`;
      obj.shopName = shopName;
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'M月D日h:i');

      obj.type = type;

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
