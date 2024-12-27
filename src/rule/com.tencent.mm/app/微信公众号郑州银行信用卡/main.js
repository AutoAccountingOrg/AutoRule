import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '郑州银行信用卡';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /交易时间：(.*?)\n交易类型：(.*?)（尾号(\d+)）\n交易金额：人民币(.*?)元，当前可用额度：.*?元/,
    match => {
      const [, time, type, number, money] = match;
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
        formatDate(time, 'Y年M月D日h时i分'), // 2024年12月24日09时09分
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
