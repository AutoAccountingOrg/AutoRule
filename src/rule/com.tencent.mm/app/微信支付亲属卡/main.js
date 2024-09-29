import { BillType, Currency, formatDate, RuleObject, toFloat, findNonEmptyString, parseWechat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '亲属卡扣款凭证'
];

// 正则表达式和处理函数的映射关系
const rules =[
  [
    // 扣款金额￥18.00\n交易用户Nigori\n支付场景姚先生饸饹面\n支付方式招商银行储蓄卡(1956)
    /扣款金额￥(\d+\.\d{2})\n交易用户(.*?)\n支付场景(.*?)\n支付方式(.*?)$/,
    match => {
      const [, money, shopName, shopItem, accountNameFrom] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        shopItem,
        findNonEmptyString(accountNameFrom),
        '',
        0.0,
        Currency['人民币'],
        formatDate(),
        '微信[微信支付-亲属卡消费]'
      );
    },
  ],
];


/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE_NAME_WECHAT, TITLE_WECHAT);
}
