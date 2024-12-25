import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '广东农信';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易账号:借记卡（尾号0666）\n交易时间:2024-09-25 12:09\n交易类型:收入\n交易金额:人民币1000.00元\n可用余额:人民币8888.12元
    /交易账号:借记卡（尾号(\d{4})）\n交易时间:(.*?)\n交易类型:(.*?)\n交易金额:(.*?)([\d,]+.\d{2})元\n可用余额:(.*?)元/,
     match => {
      let [, number, time, type, currency, money, balance] = match;
       let { matchType, typeName } = isPaymentType(type);

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        type,
        `广东农信(${number})`,
        '',
        0.0,
        Currency[currency], // 5月7日10:50
        formatDate(time, 'Y-M-D h:i'),
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ]
];

export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
