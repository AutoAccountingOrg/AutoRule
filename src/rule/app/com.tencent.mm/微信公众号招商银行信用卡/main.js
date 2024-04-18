import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

const SOURCE_NAME = "招商银行信用卡";
const TITLES = ["交易成功提醒", "自动还款到账提醒"];

// 定义正则表达式，用于匹配交易时间、交易类型、交易金额、交易商户和可用额度
const regexMap = new Map([
  [
    /交易时间：尾号(\d+)信用卡(\d{2}月\d{2}日\d{2}:\d{2})\n交易类型：(.*?)\n交易金额：(\d+\.\d{2})(.*?)\n交易商户：(.*?)\n可用额度：.*/,
    (match) => {
      const [, cardNumber, time, type, money, currency, shopName] = match;
      const currentYear = new Date().getFullYear(); // 获取当前年份
      return {
        accountNameFrom: `招商银行信用卡（${cardNumber}）`,
        time: `${currentYear}年${time}`,
        type: type === "消费" ? BillType.Expend : null,
        money: parseFloat(money),
        shopName: shopName,
        Currency: Currency[currency],
        Channel: `微信[招行信用卡${type}]`,
      };
    },
  ],
  [
    /账户名称：.*?\n还款时间：(.*?)\n还款金额：(.*?)(\d+\.\d{2})/,
    (match) => {
      const [, time, currency, money] = match;
      return {
        accountNameTo: "招商银行信用卡",
        time: time,
        type: BillType.Transfer,
        money: parseFloat(money),
        shopName: "",
        Currency: Currency[currency],
        Channel: `微信[招行信用卡还款]`,
      };
    },
  ],
]);

/**
 * 解析招商银行信用卡消费文本
 * @param {string} text - 需要解析的文本
 * @returns {Object|null} - 解析结果对象，如果解析失败则返回null
 */
function parseText(text) {
  for (let [regex, handler] of regexMap) {
    const match = text.match(regex);
    if (match) {
      return handler(match);
    }
  }
  return null;
}

/**
 * 获取招商银行信用卡消费规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  const mapItem = JSON.parse(data).mMap;
  if (mapItem.source !== SOURCE_NAME || !TITLES.includes(mapItem.title)) {
    return null;
  }

  const parsedText = parseText(mapItem.description);
  if (!parsedText || parsedText.type === null) return null;

  return new RuleObject(
    parsedText.type,
    parsedText.money,
    parsedText.shopName,
    parsedText.shopItem,
    parsedText.accountNameFrom,
    parsedText.accountNameTo,
    0,
    parsedText.Currency,
    parsedText.time,
    parsedText.Channel,
  );
}
