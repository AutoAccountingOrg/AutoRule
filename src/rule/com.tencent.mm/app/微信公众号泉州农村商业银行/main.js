import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '泉州农村商业银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易时间：2024年06月16日 12时36分\n交易类型：转出支出（尾号2467储蓄账户）\n交易金额：人民币0.01元（对方户名:WL财付通微信转账:微...\n卡内余额：人民币393.18元
    /交易时间：(.*?)\n交易类型：转出支出（尾号(\d+)储蓄账户）\n交易金额：人民币([\d,]+.\d{2})元（对方户名:(.*?)\n卡内余额：人民币.*?元/,
    match => {
      let [, time, number, money, shopItem] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '',
        shopItem,
        `泉州农村商业银行(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h时i分'),
        `微信[${SOURCE}-消费]`
      );
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
