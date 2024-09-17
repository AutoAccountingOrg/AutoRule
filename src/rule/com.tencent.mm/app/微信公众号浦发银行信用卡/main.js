import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '浦发银行信用卡';
const TITLES_BOC = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    //银行卡号：尾号7928\n交易时间：07月08日 12:15\n交易类型：消费\n交易金额：人民币3.00元\n商户名称：支付宝-美宜佳（湖北）便利店...
    /银行卡号：尾号(.*?)\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：人民币([\d,]+.\d{2})元\n商户名称：(.*?)$/,
      match => {


      return {
        "money": toFloat(match[4]),
        "type": BillType.Expend,
        "time": match[2],
        "shopItem": match[5],
        "accountNameFrom": `${SOURCE_NAME_BOC}(${match[1]})`,
        "Currency": Currency['人民币'],
        "channel": `微信[${SOURCE_NAME_BOC}-消费]`,
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
    mapItem.source !== SOURCE_NAME_BOC ||
    !TITLES_BOC.includes(mapItem.title)
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
    formatDate(parsedText.time, 'M月D日 h:i'),
    parsedText.channel
  );
}
