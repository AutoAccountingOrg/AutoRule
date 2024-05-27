import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';
import { toFloat } from '../../../../utils/Number';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '农业银行信用卡';
const TITLES_BOC = ['交易成功通知'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = new Map([
  [
    //交易时间：2024-05-27 00:30:49\n交易类型：卡号尾号（5981），退货\n交易金额：1281.56元\n可用余额：67591.21元\n交易地址：财付通退款
    /交易时间：(.*?)\n交易类型：卡号尾号（(\d+)），(.*?)\n交易金额：([\d,]+.\d{2})元\n可用余额：.*?元\n交易地址：(.*?)$/,
    match => {
      const [, time, number, type, money, shopName] = match;

      let billType = BillType.Expend;
      let channel = ``;
      if (type.includes('退货')) {
        billType = BillType.Income;
        channel = `收入`;
      } else if (type.includes('支付')) {
        billType = BillType.Expend;
        channel = `支出`;
      }

      return {
        money: toFloat(money),
        type: billType,
        time: formatDate(time, 'Y-M-D h:i:s'), //2024-05-12 17:51
        shopItem: type,
        shopName: shopName,
        accountNameFrom: `${SOURCE_NAME_BOC}(${number})`,
        Currency: Currency['人民币'],
        channel: `微信[${SOURCE_NAME_BOC}-${channel}]`,
      };
    },
  ],
]);

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
    parsedText.channel,
  );
}
