import { BillType, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '宁波银行';
const TITLES = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const regexMapBOC = [
  [
    //交易类型:尾号2582-工资-人民币\n交易时间:09月15日 17:00\n交易对象:大夏公司\n交易金额:1696.49\n可用余额:428.97
    //交易类型:尾号2582-网络支付消费-人民币\n交易时间:09月16日 10:29\n交易对象:拼多多平台商户\n交易金额:58.75\n可用余额:370.22
    //交易类型:尾号2582-网络支付退款-人民币\n交易时间:09月17日 11:35\n交易对象:上海付费通信息服务有限公司\n交易金额:-3.99\n可用余额:374.21
    /交易类型:尾号(\d{4})-(.*?)-人民币\n交易时间:(.*?)\n交易对象:(.*?)\n交易金额:([\d,]+.\d{2})\n可用余额:([\d,]+.\d{2})$/,
    match => {
      let [,number,shopItem,time,shopName,money,] = match
      let billType = BillType.Income;
      if (shopItem.indexOf("消费") !==-1 ){
        billType = BillType.Expend;
      }

      return {
        "money": toFloat(money),
        "type": billType,
        "time": formatDate(time,"M月D日 h:i"),
        "shopItem": shopItem,
        "shopName":shopName,
        "accountNameFrom": `${SOURCE}(${number})`,
        "Currency": Currency["人民币"],
        "channel": `微信[${SOURCE}-收入]`,
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
    parsedText.Currency, //5月7日10:50
    parsedText.time,
    parsedText.channel
  );
}
