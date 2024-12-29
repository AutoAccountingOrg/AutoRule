import { BillType, formatDate, parseWechat, RuleObject, transferCurrency } from 'common/index.js';

const SOURCE_NAME = '招商银行信用卡';
const TITLE = ['交易成功提醒', '自动还款到账提醒', '还款提醒', '自动还款失败通知'];

// 定义正则表达式，用于匹配交易时间、交易类型、交易金额、交易商户和可用额度
const rules = [
  [
    //交易时间：尾号8995信用卡10月07日01:56\n交易类型：消费\n交易金额：200.50人民币\n交易商户：网上国网\n可用额度：￥104750.75
    /交易时间：尾号(\d+)信用卡(\d{2}月\d{2}日\d{2}:\d{2})\n交易类型：(.*?)\n交易金额：(\d+\.\d{2})(.*?)\n交易商户：(.*?)\n可用额度：.*/,
    match => {
      const [, cardNumber, time, type, money, currency, merchant] =
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
      // 解析商户名称
      let shopName = merchant;
      let shopItem = '';
      const merchantMatch = merchant.match(/(.*?)-(.*)$/);
      if (merchantMatch) {
        shopName = merchantMatch[1];
        shopItem = merchantMatch[2];
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
      );
    }
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
      );
    }
  ],
  [
    // 账户类型:个人消费卡账户\n还款时间:09月26日 12:20:40\n还款金额:人民币3661.60元\n还款结果:账单已还清
    /账户类型:个人消费卡账户\n还款时间:(.*?)\n还款金额:(.*?)(\d+\.\d{2})元\n还款结果:(.*?)$/,
    match => {
      const [, time, currency, money, shopItem] = match;
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
      );
    }
  ],
  [
    // 还款账户:个人消费卡账户\n应扣金额:人民币61597.12元\n还款金额:人民币13905.14元\n失败原因:关联活期账户余额不足，未足额扣款\n还款方式:预约还款失败，剩余欠款请自行还款至信用卡
    /还款账户:个人消费卡账户\n应扣金额:(.*?)(\d+\.\d{2})元\n还款金额:(.*?)(\d+\.\d{2})元\n失败原因:(.*?)\n还款方式:(.*?)$/,
    (match, t) => {
      const [, currency1, money1, currency2, money2, reason, method] = match;
      return new RuleObject(
        BillType.Transfer,
        parseFloat(money2),
        '',
        reason,
        '',
        SOURCE_NAME,
        0.0,
        transferCurrency(currency2),
        t,
        `微信[${SOURCE_NAME}-自动还款失败]`
      );
    }
  ]
];

/**
 * 获取招商银行信用卡消费规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE_NAME, TITLE);
}
