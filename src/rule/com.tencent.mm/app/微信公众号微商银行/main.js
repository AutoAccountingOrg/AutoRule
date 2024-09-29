import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '徽商银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /交易时间：(.*?)\n交易类型：快捷支付-(.*?)\n交易金额：(.*?)\(尾号(\d+)(.*?)\)\n卡内余额：(.*?)/,
    match => {
      const [, time, shopItem, money, number,card, balance] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '',
        shopItem,
        `${card}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日 h:i:s'),
        `微信[${SOURCE}-消费]`
      );
    }
  ],
  [
    /交易时间：(.*?)\n交易类型：退款-(.*?)\n交易金额：(.*?)\(尾号(\d+)(.*?)\)\n卡内余额：(.*?)/,
    match => {
      const [, time, shopItem, money, number, currency, balance] = match;
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        '',
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日 h:i:s'),
        `微信[${SOURCE}-退款]`
      );
    },
  ],
];


/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE)
}
