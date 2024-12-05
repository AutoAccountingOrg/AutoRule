import { BillType, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

const rules = [
  [
    //【招商银行】您账户0877于12月03日22:44在财付通-滴滴出行快捷支付27.78元
    /您账户(\d{4})于(\d+月\d+日\d+:\d+)在(.*?)支付([\d,]+.\d{2})元/,
    match => {
      let [, number, date, merchant, money] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `招商银行[消费]`;
      obj.currency = 'CNY';
      obj.shopItem = `${merchant}`;
      obj.time = formatDate(date, "M月D日h:i");

      obj.type = BillType.Expend;
      obj.accountNameFrom = `招商银行(${number})`;
      return obj;
    }
  ],
  [
    //【招商银行】您账户6598于09月26日12:20向尾号为1356的信用卡还款人民币322261.60元，收款人收拾收拾，请以收款人实际入账为准。
    /您账户(\d{4})于(\d+月\d+日\d+:\d+)向尾号为(\d{4})的信用卡还款人民币([\d,]+.\d{2})元，收款人(.*?)，/,
    match => {
      let [, fromNumber, date, toNumber, money, shopName] = match;

      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `招商银行[还款]`;
      obj.currency = 'CNY';
      obj.shopName = shopName;
      obj.shopItem = '信用卡还款';
      obj.time = formatDate(date, "M月D日h:i");

      obj.type = BillType.Transfer;
      obj.accountNameFrom = `招商银行(${fromNumber})`;
      obj.accountNameTo = `招商银行信用卡(${toNumber})`;
      return obj;
    }
  ]
];

/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== "招商银行") return null;
  for (let rule of rules) {
    const match = text.match(rule[0]);
    if (match) {
      return rule[1](match, t);
    }
  }
}