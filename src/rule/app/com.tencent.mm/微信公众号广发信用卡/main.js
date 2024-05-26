import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';
import { toFloat } from '../../../../utils/Number';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '广发信用卡';
const TITLES_BOC = ['交易成功提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = new Map([
  [
    /交易时间：尾号(\d+)广发卡(.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d,]+.\d{2})元\n交易商户：(.*?)-(.*?)\n可用额度：人民币.*?元。点详情查分期还款优惠方案！/,
    match => {
      const [, number, time, type, currency, money, shopName, shopItem] = match;
      var billType = BillType.Expend;
      var channel = `支出`;
      switch (type) {
        case '消费':
          billType = BillType.Expend;
          channel = `支出`;
          break;
      }
      return {
        money: toFloat(money),
        type: billType,
        time: formatDate(time, 'M月D日h:i'), //05月26日20:01
        shopItem: shopItem,
        shopName: shopName,
        accountNameFrom: `${SOURCE_NAME_BOC}(${number})`,
        Currency: Currency[currency],
        channel: `微信[${SOURCE_NAME_BOC}-支出]`,
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
