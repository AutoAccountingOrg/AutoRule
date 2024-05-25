import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '中国建设银行';
const TITLES_BOC = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = new Map([
  [
    /交易时间：(.*?)\n交易类型：(收入|支出)（尾号(\d+)储蓄卡）\n交易金额：(.*?)（(.*?)）/,
    match => ({
      money: parseFloat(match[4].replace(',', '')),
      type:
        match[2] === '支出'
          ? BillType.Expend
          : match[2] === '收入'
            ? BillType.Income
            : null,
      time: match[1],
      accountNameFrom: `${SOURCE_NAME_BOC}储蓄卡(${match[3]})`,
      Currency: Currency[match[5]],
      channel: `微信[${SOURCE_NAME_BOC}-${match[2]}]`,
    }),
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
    parsedText.Currency, //2024年5月8日 00:56:08
    formatDate(parsedText.time, 'Y年M月D日 h:i:s'),
    parsedText.channel,
  );
}
