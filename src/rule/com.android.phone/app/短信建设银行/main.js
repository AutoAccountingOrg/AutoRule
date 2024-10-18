import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';


// 正则表达式和处理函数的映射关系
const rules = [
  [
    //您尾号1234的龙卡信用卡10月02日23:00消费/预付款858.00日元，当前可用额度123456元。实际消费金额以入账结算币种金额为准。
    /您尾号(\d{4})的龙卡信用卡(.*?)消费\/预付款([\d,]+.\d{2})(.*?)，当前可用额度([\d,]+.\d{2})元。实际消费金额以入账结算币种金额为准。/,
    match => {
      let [,number,date,money,currency,] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `建设银行信用卡[消费]`;
      obj.currency = Currency[currency];
      obj.time = formatDate(date,"M月D日h:i");

      obj.type = BillType.Expend


      obj.accountNameFrom = `建设银行信用卡(${number})`;
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
  if (bankName !== "建设银行") return null;
  for (let rule of rules) {
    const match = text.match(rule[0]);
    if (match) {
      return rule[1](match,t);
    }
  }
}


