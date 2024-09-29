import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '网商银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间:2024-07-04 08:08:26\n交易类型:支付宝支付\n交易金额:人民币30.00元
    /交易时间:(.*?)\n交易类型:(.*?)\n交易金额:人民币(.*?)元/,
    match => {
      const [, time, shopItem, money] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '',
        shopItem,
        SOURCE,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'),
        `微信[${SOURCE}-消费]`)
    }
  ],
];


/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE)
}
