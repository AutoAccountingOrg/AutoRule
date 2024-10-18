import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '江西宜春农商银行微银行';
const TITLE = ['账户变动提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //5月7日10:50
    //交易时间：2024年10月12日 16:43:23\n交易类型：乡补绩效-转入\n交易金额：人民币1,896.00元
    /交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d,]+.\d{2})元/,
     match => {
      let [, time, type, currency, money] = match;
      let matchType = BillType.Expend
      let shopItem = type;
      let matchTypeName = "支出";
      if (type.indexOf('转入') !== -1) {
        shopItem = type;
        matchType = BillType.Income;
        matchTypeName = "收入";
      }

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        shopItem,
        `江西宜春农商银行`,
        '',
        0.0,
        Currency[currency], // 2024年10月13日 08:43:11
        formatDate(time, 'Y年M月D日 h:i:s'),
        `微信[${SOURCE}-${matchTypeName}]`
      );
    }
  ]
];

export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
