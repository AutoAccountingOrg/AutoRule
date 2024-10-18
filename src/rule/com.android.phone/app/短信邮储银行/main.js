import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat, transferCurrency } from 'common/index.js';


// 正则表达式和处理函数的映射关系
const rules = [
  [
    //24年10月09日15:54您尾号097账户快捷支付，支出金额680.00元，余额155.70元。
    /(.*?)您尾号(\d{3})账户快捷支付，支出金额([\d,]+.\d{2})元，余额([\d,]+.\d{2})元。/,
    match => {
      let [,date,number,money,] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `邮储银行[消费]`;
      obj.currency = Currency["人民币"];
      obj.time = formatDate(date,"Y年M月D日h:i");
      obj.type = BillType.Expend


      obj.accountNameFrom = `邮储银行(${number})`;
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
  if (bankName !== "邮储银行") return null;
  for (let rule of rules) {
    const match = text.match(rule[0]);
    if (match) {
      return rule[1](match,t);
    }
  }
}


