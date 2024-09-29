import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国民生银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /交易账号:借记卡（(\d+)）\n交易时间:(.*?)\n交易类型:(.*?)-(.*?)\n交易金额:(.*?) ([\d]+.\d{2})\n交易对象:(.*?)$/,
    match => {
      let [, number, time, matchType, shopItem, currency, money,shopName] = match;
      let matchTypeName = '';
      switch (matchType) {
        case '存入':
          matchTypeName = '收入';
          matchType = BillType.Income;
          break;
        case '支出':
          matchTypeName = '支出';
          matchType = BillType.Expend;
          break;
      }

      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}借记卡(${number})`,
        '',
        0.0,
        Currency[currency],
        formatDate(time, 'Y年M月D日 h:i:s'),
        `微信[${SOURCE}-${matchTypeName}]`
      )
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
