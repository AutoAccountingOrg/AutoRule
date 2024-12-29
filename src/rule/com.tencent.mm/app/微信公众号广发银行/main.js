import { formatDate, isPaymentType, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '广发银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：尾号8206广发卡10月23日18:09\n交易类型：消费\n交易金额：人民币9.90元\n交易商户：抖音支付-抖音生活服务商家\n可用额度：人民币1771.74元。点详情借钱，利息1.9折起
    //交易时间：您尾号5005卡 10月16日00:12\n交易类型：转账支出\n交易金额：人民币40.00元
    /交易时间：您尾号(\d+)卡 (.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d,]+.\d{2})元/,
    match => {
      const [, number, time, type, currency, money] = match;
      let { matchType, typeName } = isPaymentType(type);
      // let {shopName,shopItem} = splitShop(item)
      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        '',
        `${SOURCE}(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ],
];

/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
