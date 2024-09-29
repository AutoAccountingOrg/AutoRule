import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '保定银行';
const TITLE = ['动账交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /账号类型：(.*?)\n交易时间：(.*?)\n交易类型：(.*?)（尾号(\d+)）\n交易金额：(.*?)([\d,]+.\d{2})元\n账户余额：.*?元/,
    match => {
      const [, card, time, type, number, currency, money] = match;
      let billType = BillType.Income;
      const channel = '支出';
      if (type.indexOf('支付') !== -1 || type.indexOf('消费') !== -1) {
        billType = BillType.Expend;
      }
      return new RuleObject(
        billType,
        toFloat(money),
        '',
        type,
        `${SOURCE}${card}(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'Y-M-D h:i'),
        `微信[${SOURCE}-${channel}]`
      )

    },
  ],
];



/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
