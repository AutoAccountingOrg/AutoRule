import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '京东支付';
const TITLE = ['交易成功提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 支付金额：¥17.03  (已优惠¥0.02)\n交易商户：京东平台商户\n交易时间：2024-06-13 07:38:27\n支付方式：江苏银行信用卡(尾号6706)\n交易单号：14081252406130738270946452746
    /支付金额：¥([\d,]+.\d{2})(.*?)?\n交易商户：(.*?)\n交易时间：(.*?)\n支付方式：(.*?)\n交易单号：\d+/,
    match => {
      const [, money, discount, shopName, time, payType] = match;

      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        '',
        payType,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'),
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
