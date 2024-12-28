import { Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = 'Ada服务消息';
const TITLE = ['交易到账通知'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易日期：2024-12-11\n到账时间：2024-12-11 18:18:29\n到账金额：49.85元\n到账状态：交易已经到账
    /交易日期：(.*?)\n到账时间：(.*?)\n到账金额：(.*?)元\n到账状态：(.*?)/,
    match => {
      const [, date, time, money, status] = match;
      return new RuleObject(
        'Income',
        toFloat(money),
        '',
        '',
        '',
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'), // 2024-12-11 18:18:29
        `微信[${SOURCE}-到账]`
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
