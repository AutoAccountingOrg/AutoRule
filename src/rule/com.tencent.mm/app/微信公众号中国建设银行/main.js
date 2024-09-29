import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国建设银行';
const TITLE = ['交易提醒', '交易结果通知', '实时交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /交易时间：(.*?)\n交易类型：(收入|支出)（尾号(\d+)储蓄卡）\n交易金额：(.*?)（(.*?)）/,
    match => {
      let [, time, type, number, money, currency] = match;
      return new RuleObject(
        type === '支出' ? BillType.Expend : BillType.Income,
        toFloat(money),
        '',
        '',
        `${SOURCE}储蓄卡(${number})`,
        '',
        0.0,
        Currency[currency],
        formatDate(time, 'Y年M月D日 h:i:s'),
        `微信[${SOURCE}-${type}]`
      );
    }
  ],
  [
    //交易时间：5月17日 17时52分\n交易类型：尾号8254信用卡人民币消费\n交易金额：29.90元\n可用额度：18224.14元
    /交易时间：(.*?)\n交易类型：尾号(\d+)信用卡(.*?)消费\n交易金额：(.*?)\n可用额度：(.*?)元/,
    match => {
      const [, time, number, currency, money, available] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '',
        '',
        `${SOURCE}信用卡(${number})`,
        '',
        0.0,
        Currency[currency],
        formatDate(time, 'M月D日 h时i分'),
        `微信[${SOURCE}信用卡-支出]`
      );

    },
  ],

  [
    //交易时间：2024年05月27日02时16分\n交易类型：尾号4243信用卡消费退款/退税\n交易金额：74.26（人民币）
    /交易时间：(.*?)\n交易类型：尾号(\d+)信用卡(.*?)\n交易金额：(.*?)（(.*?)）/,
    match => {
      const [, time, number, type, money, currency] = match;
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        '',
        type,
        `${SOURCE}信用卡(${number})`,
        '',
        0.0,
        Currency[currency],
        formatDate(time, 'Y年M月D日h时i分'),
        `微信[${SOURCE}信用卡-收入]`
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
