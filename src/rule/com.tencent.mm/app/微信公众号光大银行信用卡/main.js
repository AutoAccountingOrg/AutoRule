import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, splitShop, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '光大银行信用卡';
const TITLE = ['信用卡交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易时间:2024年11月25日 18:55\n交易类型:尾号5338信用卡,消费\n交易金额:10000元\n交易商户:财付通 华强电子世界\n可用额度:23358.81元","source":"光大银行信用卡
    // 交易时间:2024年12月18日 10:10交易类型:尾号7558信用卡,消费\n交易金额:100元\n交易商户:中国石化销售股份有限公司安徽石油\n可用额度:36120.67元
    /交易时间:(.*?)(\n)?交易类型:尾号(\d+)信用卡,(.*?)[\s\n]交易金额:(\d+(?:\.\d+)?)元[\s\n]交易商户:(.*?)[\s\n]可用额度:/,
    match => {
      let [, time, , cardNumber, type, money, merchant] = match;

      // 检查商户名称是否包含空格，如果包含则分割
      let { shopName, shopItem } = splitShop(merchant, null, ' ');

      let { matchType, typeName } = isPaymentType(type);


      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}(${cardNumber})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i'),
        `微信[${SOURCE}-${typeName}]`
      );
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
