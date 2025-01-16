import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //24年10月09日15:54您尾号097账户快捷支付，支出金额680.00元，余额155.70元。
    //25年01月16日16:50您尾号800账户快捷支付，支出金额1.00元，余额123.63元
    /(.*?)您尾号(\d{3})账户快捷支付，支出金额(.*?)元，余额(.*?)元/,
    match => {
      let [, date, number, money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `邮储银行[消费]`;
      obj.currency = Currency['人民币'];
      obj.time = formatDate(date, 'Y年M月D日h:i');
      obj.type = BillType.Expend;

      obj.accountNameFrom = `邮储银行(${number})`;
      return obj;
    }
  ], //尊敬的客户：11月18日11:48[巢湖学院]向您尾号1707账户扣收[校园卡圈存]100.00元，扣款成功100.00元。客服95580[回XFDXTD92退订，回XFDXYC92夜间免扰，24小时内回复有效]

  [
    //尊敬的客户：11月18日11:48[巢湖学院]向您尾号1707账户扣收[校园卡圈存]100.00元，扣款成功100.00元。客服95580[回XFDXTD92退订，回XFDXYC92夜间免扰，24小时内回复有效]
    /尊敬的客户：(.*?)\[(.*?)]向您尾号(\d{4})账户扣收\[(.*?)]([\d,]+.\d{2})元，扣款成功([\d,]+.\d{2})元。/,
    match => {
      let [, date, shopName, number, shopItem, money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `邮储银行[圈存]`;
      obj.currency = Currency['人民币'];
      obj.time = formatDate(date, 'M月D日h:i');
      obj.type = BillType.Transfer;
      obj.shopName = shopName;
      obj.shopItem = shopItem;

      obj.accountNameFrom = `邮储银行(${number})`;
      obj.accountNameTo = `${shopName}(校园卡)`;
      return obj;
    }
  ], //尊敬的

];

/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== '邮储银行') {
    return null;
  }
  for (let rule of rules) {
    const match = text.match(rule[0]);
    if (match) {
      return rule[1](match, t);
    }
  }
}
