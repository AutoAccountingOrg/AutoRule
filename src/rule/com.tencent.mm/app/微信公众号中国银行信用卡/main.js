import { BillType, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国银行信用卡';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易时间：2024年10月15日\n交易类型：购汇还款\n交易金额：购汇转入USD150.00
    //交易时间：10月11日 11:30\n交易类型：消费-钱袋宝支付\n交易金额：RMB14.16
   /交易时间：(\d{4}年\d{2}月\d{2}日)\n交易类型：(.*?)\n交易金额：(.*?)([A-Z]+)([\d,]+.\d{2})$/,
     match => {

    let [,  time, type,type2,currency, money] = match;
   return new RuleObject(
      BillType.Expend,
      toFloat(money),
     type,
     type2,
      `中国银行信用卡`,
      '',
      0.0,
     currency, // 5月7日10:50
      formatDate(time, 'Y年M月D日'),
      `微信[${SOURCE}-支出]`
    );
    },
  ],
  [
    //交易时间：2024年10月15日\n交易类型：购汇还款\n交易金额：购汇转入USD150.00
    //交易时间：10月11日 11:30\n交易类型：消费-钱袋宝支付\n交易金额：RMB14.16
    /交易时间：(\d{2}月\d{2}日 \d{2}:\d{2})\n交易类型：(.*?)\n交易金额：([A-Z]+)([\d,]+.\d{2})$/,
    match => {

      let [,  time, type,currency, money] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        type,
        '',
        `中国银行信用卡`,
        '',
        0.0,
        currency, // 5月7日10:50
        formatDate(time, 'M月D日 h:i'),
        `微信[${SOURCE}-支出]`
      );
    },
  ],
];


/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
