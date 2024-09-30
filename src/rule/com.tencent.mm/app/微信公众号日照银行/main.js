import { BillType, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '日照银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易卡号:6230****7644\n交易时间:2024年09月24日 19:09:33\n交易类型:收款（转账）\n交易金额:¥0.54\n余额:¥959.15
    //5月7日10:50
    /交易卡号:(.*?)\n交易时间:(.*?)\n交易类型:(.*?)\n交易金额:¥([\d,]+.\d{2})\n余额:¥([\d,]+.\d{2})/,
     match => {
      let [, number,time, type, money, balance] = match;
      let matchType = BillType.Expend
      let shopItem = type;
      let matchTypeName = "支出";
      if (type.indexOf('收款') !== -1) {
        shopItem = type;
        matchType = BillType.Income;
        matchTypeName = "收入";
      }

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        shopItem,
        `日照银行(${number})`,
        '',
        0.0,
        transferCurrency("人民币"), // 2024年09月22日  20:40
        formatDate(time, 'Y年M月D日 h:i:s'),
        `微信[${SOURCE}-${matchTypeName}]`
      );
    }
  ]
];

export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
