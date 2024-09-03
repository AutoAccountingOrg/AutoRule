import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = '美团';
const TITLES = ['支付成功通知', '退款通知'];

const regexMap = new Map([
  [
    /消费账户：(.*?)\n支付金额：(人民币)?(.*?)元\n支付方式：(.*?)\n支付时间：(.+)/,
    match => {
      const [, shopItem, , money, accountNameFrom, time] = match;

      // 返回解析结果
      return {
        "type": BillType.Expend,
        "time": formatDate(
          time.trim(),
          time.indexOf('年') !== -1 ? 'Y年M月D日 h:i' : 'Y-M-D h:i:s'
        ),
        "shopName": SOURCE_NAME,
        "shopItem": shopItem,
        "money": parseFloat(money),
        "accountNameFrom": accountNameFrom,
        "channel": `微信[${SOURCE_NAME}-消费]`,
      };
    },
  ],
  [
    /退款原因：(.*?)，退回【(.*?)】\n退款金额：(\d+\.\d{2})元（实际退款金额）/,
    match => {
      const [, shopItem, accountNameFrom, money] = match;

      // 返回解析结果
      return {
        "type": BillType.Income,
        "shopName": SOURCE_NAME,
        "shopItem": shopItem,
        "money": toFloat(money),
        "accountNameFrom": accountNameFrom,
        "channel": `微信[${SOURCE_NAME}-退款]`,
        "time": formatDate(),
      };
    },
  ],
]);

/**
 * 解析文本并返回解析结果。
 * @param {string} text - 需要解析的文本。
 * @returns {Object|null} - 解析后的结果对象，如果解析失败则返回null。
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
 * @param {string} data - 包含数据的JSON字符串。
 * @returns {RuleObject|null} - 解析后的RuleObject对象，如果解析失败则返回null。
 */
export function get(data) {
  // 解析数据
  data = JSON.parse(data);
  let mapItem = data.mMap;

  // 检查源名称和标题是否匹配
  if (mapItem.source !== SOURCE_NAME || !TITLES.includes(mapItem.title))
    return null;

  // 解析文本
  let parsedData = parseText(mapItem.description);
  // 检查解析结果是否有效
  if (!parsedData || parsedData.type === null) return null;

  // 创建并返回RuleObject对象
  return new RuleObject(
    parsedData.type,
    parsedData.money,
    parsedData.shopName,
    parsedData.shopItem,
    parsedData.accountNameFrom,
    '',
    0,
    Currency['人民币'],
    parsedData.time,
    parsedData.channel  );
}
