import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '浙商银行';
const TITLE = ['信用卡交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间:2025年01月21日 16:16\n交易金额:人民币24.41元\n可用额度:76031.40元\n交易类型:消费
    /交易时间:(.*?)\n交易金额:人民币(.*?)元\n可用额度:.*?\n交易类型:(.*?)-/,
    match => {
      const [, time, money, type] = match;
      let { matchType, typeName } = isPaymentType(type);
      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        '',
        `${SOURCE}(信用卡)`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i'), // 2025年01月21日 16:16
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
