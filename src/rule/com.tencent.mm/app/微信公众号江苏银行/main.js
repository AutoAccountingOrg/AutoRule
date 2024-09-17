import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '江苏银行';
const TITLES_BOC = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    // 交易时间：06月13日 07:38 \n交易类型：尾号6706的信用卡,消费\n交易金额：人民币17.03元\n可用额度：8147.29 元,点击查看热门活动\n交易说明：网银在线（京东支付）-京东商城业务
    /交易时间：(.*?) \n交易类型：尾号(\d+)的信用卡,消费\n交易金额：人民币(.*?)元\n可用额度：.*? 元,点击查看热门活动\n交易说明：(.*?) /,
    match => {
      const [, time, number, money, shopItem] = match;
      return {
        "money": toFloat(money),
        "type": BillType.Expend,
        "time": formatDate(time, 'M月D日 h:i'), //06月13日 07:38
        "shopName": '',
        "shopItem": shopItem,
        "accountNameFrom": `${SOURCE_NAME_BOC}(${number})`,
        "Currency": Currency['人民币'],
        "channel": `微信[${SOURCE_NAME_BOC}-消费]`,
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
