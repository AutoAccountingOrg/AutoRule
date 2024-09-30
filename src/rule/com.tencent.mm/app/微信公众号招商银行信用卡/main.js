import { BillType, Currency, formatDate, parseWechat, RuleObject, transferCurrency } from 'common/index.js';

const SOURCE_NAME = '招商银行信用卡';
const TITLE = ['交易成功提醒', '自动还款到账提醒','还款提醒'];

// 定义正则表达式，用于匹配交易时间、交易类型、交易金额、交易商户和可用额度
const rules = [
  [
    /交易时间：尾号(\d+)信用卡(\d{2}月\d{2}日\d{2}:\d{2})\n交易类型：(.*?)\n交易金额：(\d+\.\d{2})(.*?)\n交易商户：(.*?)-(.*?)\n可用额度：.*/,
    match => {
      const [, cardNumber, time, type, money, currency, shopName, shopItem] =
        match;
      let billType = BillType.Expend;
      switch (type) {
        case '消费':
          billType = BillType.Expend;
          break;
        case '退货':
          billType = BillType.Income;
          break;
      }
      return new RuleObject(
        billType,
        parseFloat(money),
        shopName,
        shopItem,
        `${SOURCE_NAME}(${cardNumber})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[${SOURCE_NAME}-${type}]`
      )
    },
  ],
  [
    // 账户类型:个人消费卡账户\n还款时间:09月26日 12:20:40\n还款金额:人民币3661.60元\n还款结果:账单已还清
    /账户名称：.*?\n还款时间：(.*?)\n还款金额：(.*?)(\d+\.\d{2})/,
    match => {
      const [, time, currency, money] = match;
      return new RuleObject(
        BillType.Transfer,
        parseFloat(money),
        '',
        '',
        '招商银行信用卡自动还款账户',
        SOURCE_NAME,
        0.0,
        transferCurrency(currency),
        formatDate(time, 'Y年M月D日h:i:s'),
        `微信[${SOURCE_NAME}-还款]`
      )
    },
  ],
  [
    // 账户类型:个人消费卡账户\n还款时间:09月26日 12:20:40\n还款金额:人民币3661.60元\n还款结果:账单已还清
    /账户类型:个人消费卡账户\n还款时间:(.*?)\n还款金额:(.*?)(\d+\.\d{2})元\n还款结果:(.*?)$/,
    match => {
      const [, time, currency, money,shopItem] = match;
      return new RuleObject(
        BillType.Transfer,
        parseFloat(money),
        '',
        shopItem,
        '',
        SOURCE_NAME,
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日 h:i:s'),
        `微信[${SOURCE_NAME}-还款]`
      )
    },
  ],
];


/**
 * 获取招商银行信用卡消费规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data,rules,SOURCE_NAME,TITLE)
}
