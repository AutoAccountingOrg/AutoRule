import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国农业银行微银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 行卡尾号：借记卡尾号（3878）\n交易时间：2024-09-19 07:55:58\n交易类型：微信支付\n交易金额：-0.10\n可用余额：110.44。历史收支明细，点此一键查询。
    /银行卡尾号：借记卡尾号（(\d{4})）\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：([-\+\d,]+.\d{2})\n可用余额：([\d,]+.\d{2})。历史收支明细，点此一键查询。/,
     match => {
      let [, number, time, type, money, balance] = match;
      let matchType = BillType.Expend
      let shopItem = type;
      let matchTypeName = "支出";
      if (money.indexOf('-') === -1) {
        shopItem = type;
        matchType = BillType.Income;
        matchTypeName = "收入";
      }

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        shopItem,
        `中国农业银行借记卡(${number})`,
        '',
        0.0,
        transferCurrency("人民币"), // 2024-09-19 07:55:58
        formatDate(time, 'Y-M-D h:i:s'),
        `微信[${SOURCE}-${matchTypeName}]`
      );
    }
  ]
];

export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
