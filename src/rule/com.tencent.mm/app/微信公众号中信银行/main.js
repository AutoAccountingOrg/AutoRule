import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中信银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  {
    //5月7日10:50
    "regex": /交易时间：尾号(.*?)储蓄卡(.*?)\n交易类型：(.*?)\n交易金额：(.*?) ([\d,]+.\d{2}) 元\n卡内余额：人民币 ([\d,]+.\d{2}) 元/,
    "match": (match) => {
      let [, number, time, type, currency, money, balance] = match;
      let matchType = BillType.Expend
      let shopItem = type;
      let matchTypeName = "支出";
      if (type.indexOf('实发') !== -1) {
        shopItem = type;
        matchType = BillType.Income;
        matchTypeName = "收入";
      }

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        shopItem,
        `中信银行储蓄卡(${number})`,
        '',
        0.0,
        Currency[currency], // 5月7日10:50
        formatDate(time, 'M月D日h:i'),
        `微信[${SOURCE}-${matchTypeName}]`
      );
    }
  }
];

/**
 * @param {string} text - 需要解析的文本
 * @returns {Object|null} - 解析结果对象，如果解析失败则返回null
 */
function parseText(text) {
  for (let rule of rules) {
    const match = text.match(rule.regex);
    if (match) {
      return rule.match(match);
    }
  }
  return null;
}

/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  const mapItem = JSON.parse(data).mMap;
  if (mapItem.source !== SOURCE || !TITLE.includes(mapItem.title)) return null;

  return parseText(mapItem.description)
}
