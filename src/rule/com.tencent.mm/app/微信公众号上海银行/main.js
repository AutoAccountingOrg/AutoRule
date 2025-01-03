import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '上海银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 账户类型：借记卡9517\n交易时间：11月14日 14:45\n交易类型：转入\n交易金额：人民币216.86元\n余额：人民币216.86元
    /账户类型：借记卡(\d+)\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：人民币(.*?)元\n余额：人民币(.*?)元/,
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
        formatDate(time, 'M月D日 h:i'), // 11月14日 14:45
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
