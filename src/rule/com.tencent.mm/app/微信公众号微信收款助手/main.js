import { BillType, Currency, formatDate, RuleObject, toFloat,findNonEmptyString } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信收款助手';
const TITLES_WECHAT = [
  '经营账户提现到账',
];
var mapItem;

// 正则表达式和处理函数的映射关系
const regexMap =[
  [
    // 提现金额：¥7.00\n提现银行：四川农信(1586)\n提现时间：2024-05-31 08:23:16\n提现到账时间：2024-05-31 08:23:27
    /提现金额：¥(\d+\.\d{2})\n提现银行：(.*?)\n提现时间：.*?\n提现到账时间：(.*?)$/,
    match => ({
      "money": toFloat(match[1]),
      "accountNameFrom": "微信经营账户",
      "accountNameTo": match[2],
      "time": formatDate(match[3],"Y-M-D h:i:s"),
      "type": BillType.Transfer,
      "channel": `微信[${SOURCE_NAME_WECHAT}-提现]`,
    }),
  ],
];

/**
 * 解析微信支付文本
 * @param {string} text - 需要解析的文本
 * @returns {Object|null} - 解析结果对象，如果解析失败则返回null
 */
function parseWeChatText(text) {
  for (let [regex, handler] of regexMap) {
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
  mapItem = JSON.parse(data).mMap;
  if (
    mapItem.source !== SOURCE_NAME_WECHAT ||
    !TITLES_WECHAT.includes(mapItem.title.replace(/\d+\.\d{2}/, ''))
  ) {
    return null;
  }
  // 解析文本
  const parsedText = parseWeChatText(mapItem.description);
  if (!parsedText || parsedText.type === null) {
    return null;
  }

  // 创建并返回RuleObject对象
  return new RuleObject(
    parsedText.type,
    parsedText.money,
    findNonEmptyString(
      parsedText.shopName,
      mapItem.display_name
    ),
    parsedText.shopItem,
    parsedText.accountNameFrom,
    parsedText.accountNameTo,
    0,
    Currency['人民币'],
    parsedText.time || formatDate(),
    parsedText.channel  );
}
