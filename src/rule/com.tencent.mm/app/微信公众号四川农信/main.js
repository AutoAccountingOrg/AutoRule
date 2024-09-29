import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '四川农信';
const TITLE = ['交易动账提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d,]+.\d{2})元\((.*?)\)\n账户余额：人民币.*?元/,
    match => {
      const [, time, shopItem, currency, money, type] = match;
      var billType = BillType.Income;
      switch (type) {
        case '收入':
          billType = BillType.Income;
          break;
      }

      return new RuleObject(
        billType,
        toFloat(money),
        '',
        shopItem,
        `${SOURCE}`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'Y-M-D h:i'),
        `微信[${SOURCE}-收入]`
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
