import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '荣基餐饮';
const TITLE = ['交易成功提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：2025/01/16 19:36:57\n交易门店：荣基快餐（流塘店）\n会员卡号：尾号5375\n交易类型：消费\n交易金额：17.69元
    /交易时间：(.*?)\n交易门店：(.*?)\n会员卡号：尾号(\d+)\n交易类型：(.*?)\n交易金额：(.*?)元/,
    match => {
      const [, time, shopName, cardNumber, type, money] = match;
      let { matchType, typeName } = isPaymentType(type);
      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        '',
        `${SOURCE}(${cardNumber})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y/M/D h:i:s'), // 2025/01/16 19:36:57
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ]
];

/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
