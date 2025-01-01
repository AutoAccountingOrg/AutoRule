import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '重庆银行微银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易金额:3元\n交易时间:2025年01月01日 11:53:05\n交易卡号:6230***********8863\n余额:635.31元\n交易类型:行内转账支取（非支票）
    /交易金额:(.*?)元\n交易时间:(.*?)\n交易卡号:(.*?)\n余额:(.*?)元\n交易类型:(.*?)$/,
    match => {
      const [, money, time, number, balance, type] = match;
      let { matchType, typeName } = isPaymentType(type);
      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        type,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i:s'), // 2025年01月01日 11:53:05
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
