import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国邮政储蓄银行';
const TITLES = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    //交易时间：2024年09月18日08:18\n交易类型：(尾号8057)快捷支付\n交易金额：(人民币)24.92元
    //交易时间：2024年06月14日23:19\n交易类型：(尾号7618)薪酬\n交易金额：(人民币)8683.33元
    /交易时间：(.*?)\n交易类型：\(尾号(\d+)\)(.*?)\n交易金额：\(人民币\)([\d,]+.\d{2})元/,
      match => {
      let [, time,number,shopItem,money] = match;
      let type  = BillType.Income;
      let typeName = "收入"
      if (shopItem.indexOf("支付")!==-1){
        type = BillType.Expend;
        typeName = "支出"
      }


      return {
        "money": toFloat(money),
        "type": type,
        "time":time,
        "shopItem": shopItem,
        "accountNameFrom": `${SOURCE}(${number})`,
        "Currency": Currency['人民币'],
        "channel": `微信[${SOURCE}-${typeName}]`,
      };
    },
  ],
];

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
    parsedText.Currency, //024年06月14日23:19
    formatDate(parsedText.time, 'Y年M月D日h:i'),
    parsedText.channel
  );
}
