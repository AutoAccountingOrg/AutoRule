import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '齐鲁银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易卡号:6223****1925\n交易时间:2025年01月18日 11:07:51\n交易类型:付款（转账）\n交易金额:¥10.00\n余额:¥6998.07
    /交易卡号:(.*?)\n交易时间:(.*?)\n交易类型:(.*?)\n交易金额:¥(.*?)\n余额:¥(.*?)/,
    match => {
      const [, number, time, type, money] = match;
      let { matchType, typeName } = isPaymentType(type);

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        '',
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i:s'), // 2025年01月18日 11:07:51
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ]
];

/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
