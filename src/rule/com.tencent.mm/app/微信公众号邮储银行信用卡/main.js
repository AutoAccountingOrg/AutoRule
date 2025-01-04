import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, splitShop, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '邮储银行信用卡';
const TITLE = ['交易提醒', '还款提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /银行卡号：尾号(\d+)\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：([\d.]+)元.*?\n商户名称：(.*)/,
    match => {
      let [, cardNumber, time, type, money, merchant] = match;

      // 解析商户名称
      let { shopName, shopItem } = splitShop(merchant);
      let { matchType, typeName } = isPaymentType(type);

      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}(${cardNumber})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i:s'),
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ],
  [
    /信用卡号:尾号(\d+)\n还款时间:(.*?)\n还款金额:￥([\d.]+)元\n还款结果:成功\n本期未还金额:￥([\d.]+)元/,
    match => {
      let [, cardNumber, time, money, unpaid] = match;

      return new RuleObject(
        'Income',
        toFloat(money),
        '邮储银行信用卡',
        '还款',
        `${SOURCE}(${cardNumber})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i:s'),
        `微信[${SOURCE}-还款]`
      );
    }
  ]
];

/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
