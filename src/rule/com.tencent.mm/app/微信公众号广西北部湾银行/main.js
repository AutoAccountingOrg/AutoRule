import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '广西北部湾银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易时间:2024-12-25 18:00:18\n交易类型:转入(9820)-重度残疾人护理补贴\n交易金额:122.00\n账户余额:143.35
    /交易时间:(.*?)\n交易类型:(.*?)\((\d+)\)-(.*?)\n交易金额:(.*?)\n账户余额:(.*?)$/,
    match => {
      let [, time, type, number, shopItem, money, balance] = match;
      let { matchType, typeName } = isPaymentType(type);

      return new RuleObject(
        matchType,
        toFloat(money),
        type,
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'], // 2024-12-25 18:00:18
        formatDate(time, 'Y-M-D h:i:s'),
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ]
];

export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
