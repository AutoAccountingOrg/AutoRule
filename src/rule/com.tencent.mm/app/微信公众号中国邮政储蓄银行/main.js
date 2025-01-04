import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国邮政储蓄银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易时间：2024年09月18日08:18\n交易类型：(尾号8057)快捷支付\n交易金额：(人民币)24.92元
    //交易时间：2024年06月14日23:19\n交易类型：(尾号7618)薪酬\n交易金额：(人民币)8683.33元
    //交易时间：2025年01月03日07:21\n交易类型：(尾号5476)扣款\n交易金额：(人民币) -8000元
    /交易时间：(.*?)\n交易类型：\(尾号(\d+)\)(.*?)\n交易金额：\(人民币\)(.*?)元/,
    match => {
      let [, time, number, shopItem, money] = match;
      let { matchType, typeName } = isPaymentType(shopItem, ['银联快捷']);

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日h:i'),
        `微信[${SOURCE}-${typeName}]`
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
