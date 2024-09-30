import { BillType, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '广发信用卡';
const TITLE = ['交易成功提醒', '交易结果提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [

    /交易时间：尾号(\d+)广发卡(.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d,]+.\d{2})元\n交易商户：(.*?)\n可用额度：人民币.*?元。.*/,
    match => {
      const [, number, time, type, currency, money, shopName] = match;
      let billType = BillType.Expend;
      let channel = `支出`;
      switch (type) {
        case '消费':
          billType = BillType.Expend;
          channel = `支出`;
          break;
      }
      return new RuleObject(
        billType,
        toFloat(money),
        shopName,
        '',
        `${SOURCE}(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[${SOURCE}-${channel}]`
      )
    },
  ],
  [
    /交易金额：(.*?)([\d,]+.\d{2})元\n交易时间：尾号(\d+)卡(.*?)\n交易类型：退款。如需更多服务，点详情进入微营业厅/,
    //   /交易时间：尾号(\d+)广发卡(.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d,]+.\d{2})元\n交易商户：(.*?)-(.*?)\n可用额度：人民币.*?元。点详情查分期还款优惠方案！/,
    match => {
      const [, currency, money, number, time] = match;
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        '',
        '',
        `${SOURCE}(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[${SOURCE}-退款]`
      )
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
