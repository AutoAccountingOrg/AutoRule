import { Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '微众银行App';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：2025年01月06日 14:47\n交易商户：财付通（银联条码支付互联互通）\n交易金额： 20.00 元/微众银行卡(0000)
    /交易时间：(.*?)\n交易商户：(.*?)\n交易金额： (.*?) 元\/微众银行卡\((\d+)\)/,
    match => {
      const [, time, shopName, money, number] = match;
      return new RuleObject(
        'Expend',
        toFloat(money),
        shopName,
        '',
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i'), // 2025年01月06日 14:47
        `微信[${SOURCE}-消费]`
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
