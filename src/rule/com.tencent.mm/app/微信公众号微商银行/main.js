import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '徽商银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：09月30日 09:42:55\n交易类型：网银跨行转入\n交易金额：9,999.99(尾号3449徽商借记卡)\n卡内余额：9,999.99
    /交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)\(尾号(\d+)(.*?)\)\n卡内余额：(.*?)/,
    match => {
      const [, time, shopItem, money, number,card, balance] = match;

      let type = BillType.Expend;
      let typeStr = "支出";
      if(
        shopItem.indexOf('转入') !== -1 ||
        shopItem.indexOf('退款') !== -1
      ){
        type = BillType.Income;
        typeStr = "收入";
      }

      return new RuleObject(
        type,
        toFloat(money),
        '',
        shopItem,
        `${card}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日 h:i:s'),
        `微信[${SOURCE}-${typeStr}]`
      );
    }
  ],
];


/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE)
}
