import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '泉州农村商业银行';
const TITLES = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    //交易时间：2024年06月16日 12时36分\n交易类型：转出支出（尾号2467储蓄账户）\n交易金额：人民币0.01元（对方户名:WL财付通微信转账:微...\n卡内余额：人民币393.18元
    /交易时间：(.*?)\n交易类型：转出支出（尾号(\d+)储蓄账户）\n交易金额：人民币([\d,]+.\d{2})元（对方户名:(.*?)\n卡内余额：人民币.*?元/,
      match => {
      return {
        "money": toFloat(match[3]),
        "type": BillType.Expend,
        "time": match[1],
        "shopItem": match[4],
        "accountNameFrom": `${SOURCE}(${match[2]})`,
        "Currency": Currency['人民币'],
        "channel": `微信[${SOURCE}-消费]`,
      };
    },
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
    parsedText.Currency, //5月7日10:50
    formatDate(parsedText.time, 'Y年M月D日 h时i分'),
    parsedText.channel
  );
}
