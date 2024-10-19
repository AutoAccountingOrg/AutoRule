import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat, transferCurrency } from 'common/index.js';


// 正则表达式和处理函数的映射关系
const rules = [
  [
    //您尾号2498广发卡10日09:27消费人民币40.00元。快速查账戳 n.95508.com/OTVBav2y7
    /您尾号(\d{4})广发卡(.*?)消费(.*?)([\d,]+.\d{2})元。快速查账戳/,
    match => {
      let [,number,date,currency,money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `广发银行[消费]`;
      obj.currency = transferCurrency(currency);
      obj.time = formatDate(date,"D日h:i");
      obj.type = BillType.Expend


      obj.accountNameFrom = `广发银行(${number})`;
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
  if (bankName !== "广发银行") return null;
  for (let rule of rules) {
    const match = text.match(rule[0]);
    if (match) {
      return rule[1](match,t);
    }
  }
}


