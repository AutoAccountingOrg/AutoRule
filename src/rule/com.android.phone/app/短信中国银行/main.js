import { BillType, formatDate, isPaymentType, RuleObject, splitSms, toFloat, transferCurrency } from 'common/index.js';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //您的信用卡6666于2024年10月05日，在钱袋宝支付消费RMB138.20元。
    /您的信用卡(\d{4})于(.*?)，在(.*?)支付消费(.*?)([\d,]+.\d{2})元。/,
    match => {
      let [,number,date,shopName,currency,money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `中国银行信用卡[消费]`;
      obj.currency = transferCurrency(currency);
      obj.time = formatDate(date,"Y年M月D日");
      obj.shopName =shopName
      obj.type = BillType.Expend


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
  ]


];


/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  let { sender,bankName,text,t } = splitSms(data);
  if (bankName !== "中国银行") return null;
  for (let rule of rules) {
    const match = text.match(rule[0]);
    if (match) {
      return rule[1](match,t);
    }
  }
}


