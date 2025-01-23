import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = 'ETC助手';
const TITLE = ['ETC扣费成功通知'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 通行流水号：沪AAM9312\n通行时间：2025-01-21 20:58:11\n扣费时间：2025-01-21 21:20:41\n通行详情：上海华新站驶入-上海绿地大道站驶出\n金额：8.12元元
    /通行流水号：(.*?)\n通行时间：(.*?)\n扣费时间：(.*?)\n通行详情：(.*?)\n金额：(.*?)元/,
    match => {
      const [, shopName, t, time, shopItem, money] = match;

      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        shopItem,
        '',
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'), // 11月14日 14:45
        `微信[${SOURCE}]`
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
