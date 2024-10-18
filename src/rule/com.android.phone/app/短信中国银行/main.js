import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat, transferCurrency } from 'common/index.js';


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


