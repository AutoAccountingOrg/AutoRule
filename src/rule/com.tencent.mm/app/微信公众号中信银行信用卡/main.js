import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中信银行信用卡';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //5月7日10:50
    /银行卡尾号：(.*?)（银联）\n交易时间：(.*?)\n交易类型：(.*?)，(.*?)\n交易金额：(.*?)([\d,]+.\d{2})元\n可用余额：人民币.*?元，点击查看账单和积分余额/,
    match => {

    let [, number, time, type, shopItem,currency, money] = match;

   return new RuleObject(
      BillType.Expend,
      toFloat(money),
      '',
      shopItem,
      `中信银行信用卡(${number})`,
      '',
      0.0,
     Currency[currency], // 5月7日10:50
      formatDate(time, 'M月D日h:i'),
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
