import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '光大银行信用卡';
const TITLE = ['信用卡交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /交易时间:(.*?)[\s\n]交易类型:尾号(\d+)信用卡,(.*?)[\s\n]交易金额:(\d+(?:\.\d+)?)元[\s\n]交易商户:(.*?)[\s\n]可用额度:/,
    match => {
      let [, time, cardNumber, type, money, merchant] = match;
      console.log(cardNumber,)
      // 解析商户名称
      let shopName = '';
      let shopItem = merchant;
      // 检查商户名称是否包含空格，如果包含则分割
      const merchantParts = merchant.trim().split(' ');
      if (merchantParts.length > 1) {
        shopName = merchantParts[0];
        shopItem = merchantParts[1];
      }
      
      // 判断交易类型
      let billType = BillType.Expend;
      let typeName = "支出";
      
      // 如果交易类型包含特定关键词，则认为是收入
      const incomeKeywords = ['退货', '转入', '退款', '还款'];
      if (incomeKeywords.some(keyword => type.includes(keyword))) {
        billType = BillType.Income;
        typeName = "收入";
      }

      return new RuleObject(
        billType,
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