import { BillType, Currency, formatDate, RuleObject } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '徽商银行';
const TITLES = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    /交易时间：(.*?)\n交易类型：快捷支付-(.*?)\n交易金额：(.*?)\(尾号(\d+)(.*?)\)\n卡内余额：(.*?)/,
    match => ({
      "money": parseFloat(match[3].replace(',', '')),
      "type": BillType.Expend,
      "time": `${match[1]}`,
      "shopItem": match[2],
      "accountNameFrom": `${match[5]}(${match[4]})`,
      "Currency": Currency['人民币'],
      "channel": `微信[${SOURCE}-消费]`,
    }),
  ],
  [
    /交易时间：(.*?)\n交易类型：退款-(.*?)\n交易金额：(.*?)\(尾号(\d+)(.*?)\)\n卡内余额：(.*?)/,
    match => ({
      "money": parseFloat(match[3].replace(',', '')),
      "type": BillType.Income,
      "time": `${match[1]}`,
      "shopItem": match[2],
      "accountNameFrom": `${match[5]}(${match[4]})`,
      "Currency": Currency['人民币'],
      "channel": `微信[${SOURCE}-退款]`,
    }),
  ],
];

/**
 * @param {string} text - 需要解析的文本
 * @returns {Object|null} - 解析结果对象，如果解析失败则返回null
 */
function parseBOCText(text) {
  for (let [regex, handler] of regexMapBOC) {
    const match = text.match(regex);
    if (match) {
      return handler(match);
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
  if (
    mapItem.source !== SOURCE ||
    !TITLES.includes(mapItem.title)
  ) {
    return null;
  }

  // 解析文本
  const parsedText = parseBOCText(mapItem.description);
  if (!parsedText || parsedText.type === null) {
    return null;
  }

  // 创建并返回RuleObject对象
  return new RuleObject(
    parsedText.type,
    parsedText.money,
    parsedText.shopName,
    parsedText.shopItem,
    parsedText.accountNameFrom,
    parsedText.accountNameTo,
    0,
    parsedText.Currency,
    formatDate(parsedText.time, 'M月D日 h:i:s'),
    parsedText.channel  );
}
