import { BillType, Currency, formatDate, parseWechat, RuleObject } from 'common/index.js';
const SOURCE_NAME = '收钱吧福利社';
const TITLE = ['交易完成通知'];

// 定义正则表达式，用于匹配交易时间、交易类型、交易金额、交易商户和可用额度
const rules = [
  [
    /订单金额：(\d+(\.\d{2})?)元\n商品详情：(.*?) (.*?)?\n订单编号：\d+/,
    match =>{
      const [, money, , shopName, shopItem] = match;
      return new RuleObject(
        BillType.Expend,
        parseFloat(money),
        shopName,
        shopItem,
        '',
        '',
        0,
        Currency['人民币'],
        formatDate(),
        `微信[${SOURCE_NAME}-消费通知]`
      )
    }
  ]
];
/**
 * 处理数据并返回结果
 * @param {string} data - 要处理的数据
 * @returns {RuleObject|null} - 处理结果对象，如果处理失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE_NAME, TITLE);
}
