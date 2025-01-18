import { BillType, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '浦发银行信用卡';
const TITLE = ['交易提醒', '还款提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //银行卡号：尾号7928\n交易时间：07月08日 12:15\n交易类型：消费\n交易金额：人民币3.00元\n商户名称：支付宝-美宜佳（湖北）便利店...
    /银行卡号：尾号(.*?)\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d,]+.\d{2})元\n商户名称：(.*?)$/,
    match => {
      let [, number, time, type, currency, money, shopItem] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '',
        shopItem,
        `浦发银行信用卡(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日 h:i'),
        `微信[${SOURCE}-消费]`);
    }
  ],
  [
    //还款时间:2025年01月18日 14:13\n还款金额:￥9.00\n还款卡号:498451******0914\n账单还款进度:已还清
    /还款时间:(.*?)\n还款金额:￥([\d,]+.\d{2})\n还款卡号:(.*?)\n账单还款进度:(.*?)$/,
    match => {
      let [, time, money, number, status] = match;
      return new RuleObject(
        BillType.Transfer,
        toFloat(money),
        '',
        '',
        '',
        `浦发银行信用卡(${number})`,
        0.0,
        'CNY',
        formatDate(time, 'Y年M月D日 h:i'),
        `微信[${SOURCE}-还款]`);
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
