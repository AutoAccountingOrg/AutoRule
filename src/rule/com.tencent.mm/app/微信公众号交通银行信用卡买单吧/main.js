import { formatDate, isPaymentType, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '交通银行信用卡买单吧';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易卡号:7355\n交易时间:2024年10月23日 12:05\n交易类型:消费\n交易金额:￥47.00\n交易附言:点击查看详情
    //交易卡号:9354\n交易时间:2024年11月29日 11:03\n交易类型:消费\n交易金额:￥10.00\n交易附言:点击查看详情>>>
    //交易卡号:7355\n交易时间:2024年11月16日 17:30\n交易类型:刷卡金抵扣\n交易金额:100.00\n交易附言:点击查看详情
    /交易卡号:(\d+)\n交易时间:(.*?)\n交易类型:(.*?)\n交易金额:(￥)?(\d+.\d{2})\n交易附言:点击查看详情/,
    (match, t, item) => {
      let [, number, time, type, , money] = match;

      let { matchType, typeName } = isPaymentType(type, ['抵扣']);

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        type,
        `交通银行信用卡(${number})`,
        '',
        0.0,
        transferCurrency('人民币'),
        formatDate(time, 'Y年M月D日 h:i'),
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ]
];

/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
