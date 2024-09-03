import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '中国民生银行';
const TITLES_BOC = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = new Map([
  [
    /交易账号:借记卡（(\d+)）\n交易时间:(.*?)\n交易类型:(.*?)-(.*?)\n交易金额:(.*?) ([\d]+.\d{2})\n交易对象:(.*?)$/,
    match => {
      var matchType = match[3];
      var matchTypeName = '';
      var shopItem = match[4];
      switch (matchType) {
        case '存入':
          matchTypeName = '收入';
          matchType = BillType.Income;
          break;
        case '支出':
          matchTypeName = '支出';
          matchType = BillType.Expend;
          break;
      }

      return {
        "money": toFloat(match[6]),
        "type": matchType,
        "time": match[2],
        "shopName": match[7],
        "shopItem": shopItem,
        "accountNameFrom": `${SOURCE_NAME_BOC}借记卡(${match[1]})`,
        "Currency": Currency[match[5]],
        "channel": `微信[${SOURCE_NAME_BOC}-${matchTypeName}]`,
      };
    },
  ],
]);

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
    parsedText.Currency, //2024年05月10日 09:34:47
    formatDate(parsedText.time, 'Y年M月D日 h:i:s'),
    parsedText.channel  );
}
