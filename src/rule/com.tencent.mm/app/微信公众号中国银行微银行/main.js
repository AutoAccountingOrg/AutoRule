import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '中国银行微银行';
const TITLES_BOC = ['交易成功提醒', '交易完成通知'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    // 交易时间：06月13日10:59\n交易类型：数字人民币随用随充（尾号2119）\n交易金额：人民币 207.35\n账户余额：1,504.80元\n交易说明：点击查看更多详情
    // 交易时间：07月04日07:54\n交易类型：转账支出（尾号6960）\n交易金额：人民币 298.78\n账户余额：5,072.39元\n交易说明：点击查看更多详情
    /交易时间：(.*?)\n交易类型：(.*?)（尾号(\d+)）\n交易金额：(.*?) ([\d,]+.\d{2})\n账户余额：.*元\n交易说明：点击查看更多详情/,
    match => ({
      "money": parseFloat(match[5].replace(',', '')),
      "type": BillType.Expend,
      "time": `${match[1]}`,
      "shopItem": match[2],
      "accountNameFrom": `中国银行(${match[3]})`,
      "Currency": Currency[match[4]],
      "channel": '微信[中国银行-消费]',
    }),
  ],
  [
    /交易时间：(.*?)\n交易类型：(.*退款)（尾号(\d+)）\n交易金额：(.*?) ([\d\,]+.\d{2})\n账户余额：.*元\n交易说明：点击查看更多详情/,
    match => ({
      "money": parseFloat(match[5].replace(',', '')),
      "type": BillType.Income,
      "time": `${match[1]}`,
      "shopItem": match[2],
      "accountNameFrom": `中国银行(${match[3]})`,
      "Currency": Currency[match[4]],
      "channel": '微信[中国银行-退款]',
    }),
  ],
  [
    /交易时间：(.*?)\n交易类型：(.*入账)（尾号(\d+)）\n交易金额：(.*?) ([\d\,]+.\d{2})\n账户余额：.*元\n交易说明：点击查看更多详情/,
    match => ({
      "money": parseFloat(match[5].replace(',', '')),
      "type": BillType.Income,
      "time": `${match[1]}`,
      "shopItem": match[2],
      "accountNameFrom": `中国银行(${match[3]})`,
      "Currency": Currency[match[4]],
      "channel": '微信[中国银行-入账]',
    }),
  ],
  //账户类型：信用卡\n账号尾号：5248\n交易时间：05月16日11:05\n交易类型：存入\n交易金额：RMB357.00
  [
    /账户类型：信用卡\n账号尾号：(\d+)\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d\,]+.\d{2})$/,
    match => {
      const [, number, time, type, currency, money] = match;

      var billType = BillType.Income;
      switch (type) {
        case '存入':
          billType = BillType.Income;
          break;
      }

      var _currency = 'CNY';
      switch (currency) {
        case 'RMB':
          _currency = 'CNY';
          break;
      }
      return {
        "money": toFloat(money),
        "type": billType,
        "time": time,
        "shopItem": type,
        "accountNameFrom": `中国银行信用卡(${number})`,
        "Currency": _currency,
        "channel": '微信[中国银行信用卡-存入]',
      };
    },
  ],
];

/**
 * 解析中国银行文本
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
 * 获取中国银行规则对象
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
    formatDate(parsedText.time, 'M月D日h:i'),
    parsedText.channel  );
}
