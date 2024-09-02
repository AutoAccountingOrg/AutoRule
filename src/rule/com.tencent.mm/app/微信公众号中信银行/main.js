import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '中信银行';
const TITLES_BOC = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = new Map([
  [
    //5月7日10:50
    /交易时间：尾号(.*?)储蓄卡(.*?)\n交易类型：(.*?)\n交易金额：(.*?) ([\d,]+.\d{2}) 元\n卡内余额：人民币 ([\d,]+.\d{2}) 元/,
    match => {
      var matchType = match[3];
      var matchTypeName = '';
      var shopItem = '';
      switch (matchType) {
        case '实发房补':
        case '实发工资':
          matchTypeName = '收入';
          shopItem = matchType;
          matchType = BillType.Income;
          break;
      }

      return {
        "money": parseFloat(match[5].replace(',', '')),
        "type": matchType,
        "time": match[2],
        "shopItem": shopItem,
        "accountNameFrom": `${SOURCE_NAME_BOC}储蓄卡(${match[1]})`,
        "Currency": Currency[match[4]],
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
    parsedText.Currency, //5月7日10:50
    formatDate(parsedText.time, 'M月D日h:i'),
    parsedText.channel
  );
}
