import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat, transferCurrency } from 'common/index.js';


// 正则表达式和处理函数的映射关系
const rules = [
  [
    //您尾号1234的龙卡信用卡10月02日23:00消费/预付款858.00日元，当前可用额度123456元。实际消费金额以入账结算币种金额为准。
    //您尾号5082的龙卡信用卡10月09日11:18消费（美团支付-美团支…）14.93元，当前可用额度78627.74元。
    //您尾号1018的龙卡信用卡10月08日消费退货/退税（支付宝-支付宝-…）207.51元，当前可用额度78642.67元。
    /您尾号(\d{4})的龙卡信用卡(\d+月\d+日\d+:\d+)消费(.*?)([\d,]+.\d{2})(.*?)，当前可用额度([\d,]+.\d{2})元。/,
    match => {
      let [,number,date,item,money,currency,] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `建设银行信用卡[消费]`;
      obj.currency = transferCurrency(currency);
      obj.shopItem = `消费${item}`;
      obj.time = formatDate(date,"M月D日h:i");

      obj.type = BillType.Expend


      obj.accountNameFrom = `建设银行信用卡(${number})`;
      return obj;
    }
  ],
  [
    //您尾号1234的龙卡信用卡10月02日23:00消费/预付款858.00日元，当前可用额度123456元。实际消费金额以入账结算币种金额为准。
    //您尾号5082的龙卡信用卡10月09日11:18消费（美团支付-美团支…）14.93元，当前可用额度78627.74元。
    //您尾号1018的龙卡信用卡10月08日消费退货/退税（支付宝-支付宝-…）207.51元，当前可用额度78642.67元。
    /您尾号(\d{4})的龙卡信用卡(\d+月\d+日)消费(.*?)([\d,]+.\d{2})(.*?)，当前可用额度([\d,]+.\d{2})元。/,
    match => {
      let [,number,date,item,money,currency,] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `建设银行信用卡[退款]`;
      obj.currency = transferCurrency(currency);
      obj.shopItem = `消费${item}`;
      obj.time = formatDate(date,"M月D日");

      obj.type = BillType.Income


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


