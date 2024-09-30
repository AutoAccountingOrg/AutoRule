import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国工商银行客户服务';
const TITLE = ['动账交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 账号类型：尾号0849的信用卡\n交易时间：2024年6月3日23:58\n交易类型：跨行消费\n交易金额：出账 427.14 人民币元\n账户余额：登录工行手机银行查看详细信息
    /账号类型：尾号(\d+)的信用卡\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：出账 ([\d,]+.\d{2}) (.*?)元\n账户余额：登录工行手机银行查看详细信息/,
    match => {
      const [, number, time, shopName, money, currency] = match;

      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        '',
        `中国工商银行信用卡(${number})`,
        '',
        0.0,
        Currency[currency],
        formatDate(time, 'Y年M月D日h:i'),
        `微信[中国工商银行信用卡-支出]`
      );
    },
  ],
  // 账号类型：尾号7091的借记卡\n交易时间：2024年9月23日11:31\n交易类型：差旅费\n交易金额：入账 100 人民币元\n账户余额：100 人民币元。点此查明细详情
  [
    /账号类型：尾号(\d+)的借记卡\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：入账 ([\d,]+(.\d{2})?) (.*?)元\n账户余额：/,
    match => {
      const [, number, time, shopItem, money,, currency] = match;

      return new RuleObject(
        BillType.Income,
        toFloat(money),
        '',
        shopItem,
        `中国工商银行借记卡(${number})`,
        '',
        0.0,
        Currency[currency],
        formatDate(time, 'Y年M月D日h:i'),
        `微信[中国工商银行借记卡-收入]`
      );
    },
  ],
];


/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {Object} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
