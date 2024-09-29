import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '京东支付';
const TITLES = ['交易成功提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    // 支付金额：¥17.03  (已优惠¥0.02)\n交易商户：京东平台商户\n交易时间：2024-06-13 07:38:27\n支付方式：江苏银行信用卡(尾号6706)\n交易单号：14081252406130738270946452746
    /支付金额：¥([\d,]+.\d{2})(.*?)?\n交易商户：(.*?)\n交易时间：(.*?)\n支付方式：(.*?)\n交易单号：\d+/,
    match => ({
      "money": toFloat(match[1].replace(',', '')),
      "type": BillType.Expend,
      "time": `${match[4]}`, //2024-05-02 18:58:44
      "shopName": match[3],
      "accountNameFrom": match[5],
      "Currency": Currency['人民币'],
      "channel": `微信[${SOURCE}-消费]`,
    }),
  ],
];

/**
 * 解析文本
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
 * 获取规则对象
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
    formatDate(parsedText.time, 'Y-M-D h:i:s'), //2024-05-02 18:58:44
    parsedText.channel  );
}
