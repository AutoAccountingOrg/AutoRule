import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';
import { toFloat } from '../../../../utils/Number';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '饿了么本地生活';
const TITLES_BOC = ['支付成功提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = new Map([
  [
    /支付单号：\d+\n支付时间：(.*?)\n支付金额：([\d,]+.\d{2})元\n支付方式：(.*?)$/,
    match => {
      const [, time, money, payFrom] = match;
      let accountNameFrom = payFrom;
      switch (payFrom) {
        case '微信支付': //微信支付不明确，应该合并账单处理
          accountNameFrom = '';
          break;
      }

      return {
        "money": toFloat(money),
        "type": BillType.Expend,
        "time": formatDate(time, 'Y-M-D h:i:s'), //2024-05-11 18:54:48
        "shopName": '饿了么',
        "accountNameFrom": accountNameFrom,
        "Currency": Currency['人民币'],
        "channel": `微信[${SOURCE_NAME_BOC}-消费]`,
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
    parsedText.channel  );
}
