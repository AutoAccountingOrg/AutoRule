import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_JD = "京东白条";
const TITLES_JD = ["还款成功通知"];

// 正则表达式和处理函数的映射关系
const regexMapJD = new Map([
  [
    /还款时间：(.*?)\n还款金额：([\d\,]+.\d{2})元/,
    (match) => ({
      money: parseFloat(match[2].replace(",", "")),
      type: BillType.Expend,
      time: `${new Date().getFullYear()}年${match[1]}`,
      accountNameTo: "京东白条",
      channel: "微信[京东白条 还款]",
    }),
  ],
]);

/**
 * 解析京东白条还款文本
 * @param {string} text - 需要解析的文本
 * @returns {Object|null} - 解析结果对象，如果解析失败则返回null
 */
function parseJDBaitiaoText(text) {
  for (let [regex, handler] of regexMapJD) {
    const match = text.match(regex);
    if (match) {
      return handler(match);
    }
  }
  return null;
}

/**
 * 获取京东白条还款规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  const mapItem = JSON.parse(data).mMap;
  if (mapItem.source !== SOURCE_NAME_JD || !TITLES_JD.includes(mapItem.title)) {
    return null;
  }

  // 解析文本
  const parsedText = parseJDBaitiaoText(mapItem.description);
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
    Currency["人民币"],
    parsedText.time,
    parsedText.channel,
  );
}
