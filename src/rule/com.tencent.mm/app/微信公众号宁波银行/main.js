import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_BOC = '宁波银行';
const TITLES_BOC = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    //交易类型:尾号2582-工资-人民币\n交易时间:09月15日 17:00\n交易对象:大夏公司\n交易金额:1696.49\n可用余额:428.97
    /交易类型:尾号(\d{4})-(.*?)-人民币\n交易时间:(.*?)\n交易对象:(.*?)\n交易金额:([\d,]+.\d{2})\n可用余额:([\d,]+.\d{2})$/,
    match => {
      let [,number,shopItem,time,shopName,money,] = match


      return {
        "money": toFloat(money),
        "type": BillType.Income,
        "time": formatDate(time,"M月D日 h:i"),
        "shopItem": shopItem,
        "shopName":shopName,
        "accountNameFrom": `${SOURCE_NAME_BOC}(${number})`,
        "Currency": Currency["人民币"],
        "channel": `微信[${SOURCE_NAME_BOC}-收入]`,
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
    parsedText.Currency, //5月7日10:50
    parsedText.time,
    parsedText.channel
  );
}
