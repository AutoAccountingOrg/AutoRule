import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';


// 正则表达式和处理函数的映射关系
const rules = [
  [
    /您尾数(\d{4})的卡号(\d{2}月\d{2}日\d{2}:\d{2})(.*?)(收入|支出)(.*?)([\d,]+.\d{2})元,余额([\d,]+.\d{2})元。【(.*?)】/,
    match => {
      let [,number,date,shopItem,type,currency,money,,card] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `广东农信[${type}]`;
      obj.shopName ="广东农信";
      obj.shopItem = shopItem;
      obj.currency = Currency[currency];
      obj.time = formatDate(date,"M月D日h:i");

      if (type === "支出") obj.type = BillType.Expend
      else obj.type = BillType.Income

      obj.accountNameFrom = `${card}(${number})`;
      return obj;
    }
  ],
  [
    //您尾号6666的信用卡10月02日10:00消费人民币9.90元，当前可用额度49841.00元。【河源农商银行】
    /您尾号(\d{4})的信用卡(.*?)消费(.*?)([\d,]+.\d{2})元，当前可用额度([\d,]+.\d{2})元。【(.*?)】/,
    match => {
      const [, number,time, currency, money, available,bank] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '',
        '',
        `${bank}信用卡(${number})`,
        '',
        0.0,
        Currency[currency],
        formatDate(time, 'M月D日h:i'),
        `广东农信[${bank}信用卡-支出]`
      );

    },
  ],


];


/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  let { sender,bankName,text,t } = splitSms(data);
  if (bankName !== "广东农信") return null;
  for (let rule of rules) {
    const match = text.match(rule[0]);
    if (match) {
      return rule[1](match,t);
    }
  }
}


