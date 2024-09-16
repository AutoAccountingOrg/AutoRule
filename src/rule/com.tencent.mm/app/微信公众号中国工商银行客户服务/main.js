import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '中国工商银行客户服务';
const TITLES_BOC = ['动账交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    /账号类型：尾号(\d+)的信用卡\n交易时间：(.*?)\n交易类型：(.*?)-(.*?)\n交易金额：出账 ([\d,]+.\d{2}) (.*?)元\n账户余额：登录工行手机银行查看详细信息/,
    match => {
      const [, number, time, shopName, shopItem, money, currency] = match;

      return {
        "money": toFloat(money),
        "type": BillType.Expend,
        "time": formatDate(time, 'Y年M月D日h:i'), //2024年5月26日20:12
        "shopItem": shopItem,
        "shopName": shopName,
        "accountNameFrom": `中国工商银行信用卡(${number})`,
        "Currency": Currency[currency],
        "channel": `微信[中国工商银行信用卡-支出]`,
      };
    },
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
    parsedText.Currency,
    parsedText.time, //2024-05-02 18:58:44
    parsedText.channel  );
}
