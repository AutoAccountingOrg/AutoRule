import { formatDate, isPaymentType, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '兴业银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：2024年09月22日  20:40\n交易类型：借记卡*4715跨行消费支出\n交易金额：5,192.00 元\n卡内余额：624.18 元
    //5月7日10:50
    /交易时间：(.*?)\n交易类型：借记卡\*(\d{4})(.*?)\n交易金额：([\d,]+.\d{2}) 元\n卡内余额：([\d,]+.\d{2}) 元/,
    match => {
      let [, time, number, type, money, balance] = match;

      let { matchType, typeName } = isPaymentType(type);

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        type,
        `兴业银行借记卡(${number})`,
        '',
        0.0,
        transferCurrency('人民币'), // 2024年09月22日  20:40
        formatDate(time, 'Y年M月D日  h:i'),
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ]
];

export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
