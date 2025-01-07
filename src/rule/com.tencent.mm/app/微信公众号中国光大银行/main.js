import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, splitShop, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国光大银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间:2025年01月06日 10:53\n交易类型:尾号7221的储蓄卡，支出\n交易金额:人民币77.40\n账户余额:人民币152.11\n交易附言:网上支付 支付宝 冯振冰
    /交易时间:(.*?)\n交易类型:尾号(\d+)的储蓄卡，(.*?)\n交易金额:人民币(.*?)\n账户余额:人民币(.*?)\n交易附言:(.*?)/,
    match => {
      const [, time, number, type, money, , _shopItem] = match;
      let { matchType, typeName } = isPaymentType(type);
      let { shopName, shopItem } = splitShop(_shopItem, ' ');
      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i'), // 2025年01月06日 10:53
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ]
];

/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
