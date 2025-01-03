import { BillType, formatDate, isPaymentType, RuleObject, splitSms, toFloat, transferCurrency } from 'common/index.js';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //您的信用卡6666于2024年10月05日，在钱袋宝支付消费RMB138.20元。
    /您的信用卡(\d{4})于(.*?)，在(.*?)支付消费(.*?)([\d,]+.\d{2})元。/,
    match => {
      let [, number, date, shopName, currency, money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `中国银行信用卡[消费]`;
      obj.currency = transferCurrency(currency);
      obj.time = formatDate(date, 'Y年M月D日');
      obj.shopName = shopName;
      obj.type = BillType.Expend;

      obj.accountNameFrom = `中国银行信用卡(${number})`;
      return obj;
    }
  ],

  [
    // 尊敬的黄胜辉，您在2024-12-24 13:05:14使用银行卡1502进行了RMB 45.00元的网上支付交易。详询95566
    /尊敬的(.*?)，您在(.*?)使用银行卡(\d{4})进行了(.*?) ([\d,]+.\d{2})元的(.*?)交易。/,
    match => {
      let [, name, date, number, currency, money, type] = match;

      let obj = new RuleObject();
      let { matchType, typeName } = isPaymentType(type);
      obj.money = toFloat(money);
      obj.channel = `中国银行[${typeName}]`;
      obj.currency = transferCurrency(currency);
      obj.time = formatDate(date, 'Y-M-D h:i:s');
      obj.type = matchType;
      obj.accountNameFrom = `中国银行(${number})`;
      obj.shopName = name;
      obj.shopItem = type;

      return obj;
    }
  ],

  [
    // 您的借记卡账户6450，于12月28日网上支付支取人民币1.00元,交易后余额1653.35【中国银行】
    // 您的借记卡账户6957，于12月03日网上支付支取人民币45元,交易后余额5200
    /您的借记卡账户(\d{4})，于(.*?)网上支付支取(.*?)([\d,]+(.\d{2})?)元,交易后余额/,
    match => {
      let [, number, date, currency, money] = match;

      let obj = new RuleObject();
      obj.money = toFloat(money);
      obj.channel = `中国银行[支出]`;
      obj.currency = transferCurrency(currency);
      obj.time = formatDate(date, 'M月D日');
      obj.type = BillType.Expend;
      obj.accountNameFrom = `中国银行(${number})`;
      obj.shopName = '网上支付';
      obj.shopItem = '支取';

      return obj;
    }
  ],

  [
    // 您的信用卡4594于2024年12月30日，消费RMB12.59元。您的卡片可用余额已低于20%。【中国银行】
    /您的信用卡(\d{4})于(.*?)，消费(.*?)([\d,]+.\d{2})元���/,
    match => {
      let [, number, date, currency, money] = match;

      let obj = new RuleObject();
      obj.money = toFloat(money);
      obj.channel = `中国银行信用卡[消费]`;
      obj.currency = transferCurrency(currency);
      obj.time = formatDate(date, 'Y年M月D日');
      obj.type = BillType.Expend;
      obj.accountNameFrom = `中国银行信用卡(${number})`;
      obj.shopName = '消费';
      obj.shopItem = '';

      return obj;
    }
  ],

  [
    // 您的借记卡/账户0263于12月31日银联入账人民币85.87元（支付宝(中国)网络技术有限公司）,交易后余额85.87【中国银行】
    /您的借记卡\/账户(\d{4})于(.*?)银联入账(.*?)([\d,]+.\d{2})元（(.*?)）,交易后余额/,
    match => {
      let [, number, date, currency, money, shopName] = match;

      let obj = new RuleObject();
      obj.money = toFloat(money);
      obj.channel = `中国银行[收入]`;
      obj.currency = transferCurrency(currency);
      obj.time = formatDate(date, 'M月D日');
      obj.type = BillType.Income;
      obj.accountNameFrom = `中国银行(${number})`;
      obj.shopName = shopName;
      obj.shopItem = '银联入账';

      return obj;
    }
  ],

  [
    // 您的借记卡账户工资卡，于12月31日支取人民币798.82元,交易后余额82.37【中国银行】
    /您的借记卡账户(.*?)，于(.*?)支取(.*?)([\d,]+.\d{2})元,交易后余额/,
    match => {
      let [, accountName, date, currency, money] = match;

      let obj = new RuleObject();
      obj.money = toFloat(money);
      obj.channel = `中国银行[支出]`;
      obj.currency = transferCurrency(currency);
      obj.time = formatDate(date, 'M月D日');
      obj.type = BillType.Expend;
      obj.accountNameFrom = `中国银行(${accountName})`;
      obj.shopName = '支取';
      obj.shopItem = '';

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
  if (bankName !== '中国银行') {
    return null;
  }
  for (let rule of rules) {
    const match = text.match(rule[0]);
    if (match) {
      return rule[1](match, t);
    }
  }
}
