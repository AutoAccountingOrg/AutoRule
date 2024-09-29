import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '饿了么本地生活';
const TITLE = ['支付成功提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /支付单号：\d+\n支付时间：(.*?)\n支付金额：([\d,]+.\d{2})元\n支付方式：(.*?)$/,
    match => {
      const [, time, money, payFrom] = match;
      let accountNameFrom = payFrom;
      switch (payFrom) {
        case '微信支付': //微信支付不明确，应该合并账单处理
          accountNameFrom = '';
          break;
      }

      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        SOURCE,
        '',
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'),
        `微信[${SOURCE}-消费]`
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
  return parseWechat(data, rules, SOURCE, TITLE);
}
