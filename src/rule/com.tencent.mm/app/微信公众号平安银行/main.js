import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '平安银行';
const TITLES = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    // 账号：尾号6274\n交易时间：6月14日 16:33\n交易类型：转账转出\n交易币种：人民币\n交易金额：0.01元
    /账号：尾号(\d+)的账户\n交易时间：(.*?)\n交易类型：(.*?)\((.*?)\)\n交易币种：(.*?)\n交易金额：([\d,]+.\d{2})$/,
    match => {
      const [, number, time, type, shopItem, currency, money] = match;
      var billType = BillType.Income;
      var channel = '消费';
      if (type.indexOf('支付') !== -1) {
        billType = BillType.Expend;
      }

      return {
        "money": toFloat(money),
        "type": billType,
        "time": formatDate(time, 'Y年M月D日h:i'), //2024年05月23日09:14
        "shopName": type,
        "shopItem": shopItem,
        "accountNameFrom": `${SOURCE}(${number})`,
        "Currency": Currency[currency],
        "channel": `微信[${SOURCE}-${channel}]`,
      };
    },
  ],
  [
    // 账号：尾号6274\n交易时间：6月14日 16:33\n交易类型：转账转出\n交易币种：人民币\n交易金额：0.01元
    /账号：尾号(\d+)\n交易时间：(.*?)\n交易类型：(.*?)\n交易币种：人民币\n交易金额：(.*?)元/,
    match => {
      const [, number, time, type, money] = match;
      var billType = BillType.Expend;

      return {
        "money": toFloat(money),
        "type": billType,
        "time": formatDate(time, 'M月D日 h:i'), //6月14日 16:33
        "accountNameFrom": `${SOURCE}(${number})`,
        "Currency": Currency['人民币'],
        "channel": `微信[${SOURCE}-消费]`,
      };
    },
  ]
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
    parsedText.Currency,
    parsedText.time, //2024-05-02 18:58:44
    parsedText.channel  );
}
