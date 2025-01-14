import { formatDate, isPaymentType, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国银行微银行';
const TITLE = ['交易成功提醒', '交易完成通知'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：06月13日10:59\n交易类型：数字人民币随用随充（尾号2119）\n交易金额：人民币 207.35\n账户余额：1,504.80元\n交易说明：点击查看更多详情
    // 交易时间：07月04日07:54\n交易类型：转账支出（尾号6960）\n交易金额：人民币 298.78\n账户余额：5,072.39元\n交易说明：点击查看更多详情
    // 交易时间：10月25日14:54\n交易类型：工资（尾号1234）\n交易金额：人民币 123,4\n账户余额：123,45.69元\n交易说明：点击查看更多详
    /交易时间：(.*?)\n交易类型：(.*?)（尾号(\d+)）\n交易金额：(.*?) (.*?)\n账户余额：.*元\n交易说明：点击查看更多详情/,
    match => {
      const [, time, type, number, currency, money] = match;

      let { matchType, typeName } = isPaymentType(type, ['随用随充']);

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        type,
        `中国银行(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[中国银行-${typeName}]`
      );

    }
  ],
  //账户类型：信用卡\n账号尾号：5248\n交易时间：05月16日11:05\n交易类型：存入\n交易金额：RMB357.00
  //账户类型：信用卡\n账号尾号：1369\n交易时间：01月05日19:36\n交易类型：消费\n交易金额：RMB14.00
  [
    /账户类型：信用卡\n账号尾号：(\d+)\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d\,]+.\d{2})$/,
    match => {
      const [, number, time, type, currency, money] = match;
      let { matchType, typeName } = isPaymentType(type);

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        type,
        `中国银行信用卡(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[中国银行信用卡-${typeName}]`
      );
    }
  ]
];

/**
 * 获取中国银行规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
