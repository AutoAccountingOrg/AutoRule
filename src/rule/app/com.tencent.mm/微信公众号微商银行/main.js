import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';
import { toFloat } from '../../../../utils/Number';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '徽商银行';
const TITLES_BOC = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = new Map([
  [
    //交易时间：05月06日 12:09:34\n交易类型：快捷支付-财付通\n交易金额：10.00(尾号3449徽商借记卡)\n卡内余额：6,666.66
    //交易时间：05月27日 15:36:09\n交易类型：网银跨行转入\n交易金额：79.40(尾号3449徽商借记卡)\n卡内余额：666.66
    /交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)\(尾号(\d+)(.*?)\)\n卡内余额：(.*?)/,
    match => {
      const [, time, type, money, number, card, total] = match;
      var billType = BillType.Expend;
      var channel = '消费';
      if (type.includes('转入')) {
        billType = BillType.Income;
        channel = '收入';
      } else if (type.includes('支付')) {
        billType = BillType.Expend;
        channel = '消费';
      }
      return {
        money: toFloat(money),
        type: billType,
        time: time,
        shopItem: type,
        accountNameFrom: `${card}(${number})`,
        Currency: Currency['人民币'],
        channel: `微信[${SOURCE_NAME_BOC}-${channel}]`,
      };
    },
  ],
  [
    /交易时间：(.*?)\n交易类型：退款-(.*?)\n交易金额：(.*?)\(尾号(\d+)(.*?)\)\n卡内余额：(.*?)/,
    match => ({
      money: parseFloat(match[3].replace(',', '')),
      type: BillType.Income,
      time: `${match[1]}`,
      shopItem: match[2],
      accountNameFrom: `${match[5]}(${match[4]})`,
      Currency: Currency['人民币'],
      channel: `微信[${SOURCE_NAME_BOC}-退款]`,
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
    parsedText.Currency,
    formatDate(parsedText.time, 'M月D日 h:i:s'),
    parsedText.channel,
  );
}
