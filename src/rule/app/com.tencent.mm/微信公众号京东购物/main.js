import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';
import { toFloat } from '../../../../utils/Number';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '京东购物';
const TITLES_BOC = ['付款成功通知'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = new Map([
  [
    /实付金额：￥([\d,]+.\d{2})元\n商品详情：(.*?)\n收货地址：(.*?)\n订单编号：(.*?)/,
    match => ({
      money: toFloat(match[1].replace(',', '')),
      type: BillType.Expend,
      shopItem: match[2],
      Currency: Currency['人民币'],
      channel: `微信[${SOURCE_NAME_BOC}-消费]`,
    }),
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
    formatDate(), //2024-05-02 18:58:44
    parsedText.channel,
  );
}
