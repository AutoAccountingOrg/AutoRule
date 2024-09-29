import { BillType, Currency, formatDate, parseWechat, RuleObject } from 'common/index.js';

const SOURCE_NAME = '长沙住房公积金';
const TITLE = ['公积金账户资金变动提醒'];
const rules =[
  [
    /账户类型：(.*?)\n业务日期：(.*?)\n业务描述：(.*?)\n业务金额：(.*?)\n账户余额：.*/,
    match => {
      let [, accountNameFrom, time, shopItem, money] = match;
      const type = shopItem.includes('汇缴') ? BillType.Income : null;
      const channel = shopItem.includes('汇缴') ? '微信[长沙公积金汇缴]' : '';
      return new RuleObject(
        type,
        parseFloat(money),
        SOURCE_NAME,
        shopItem,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'YMD'),
        channel
      )
    }
  ]
];

/**
 * 根据数据获取规则对象
 * @param {string} data - 数据字符串
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
 return parseWechat(data,rules,SOURCE_NAME,TITLE)
}
