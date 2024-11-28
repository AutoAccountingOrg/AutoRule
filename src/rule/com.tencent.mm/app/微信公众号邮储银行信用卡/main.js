import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '邮储银行信用卡';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /银行卡号：尾号(\d+)\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：([\d.]+)元.*?\n商户名称：(.*)/,
    match => {
      let [, cardNumber, time, type, money, merchant] = match;
      
      // 解析商户名称
      let shopName = '';
      let shopItem = merchant;
      const merchantMatch = merchant.match(/(.*?)-(.*)$/);
      if (merchantMatch) {
        shopName = merchantMatch[1];
        shopItem = merchantMatch[2];
      }
      
      // 判断交易类型
      let billType = BillType.Expend;
      let typeName = "支出";
      
      // 如果交易类型包含特定关键词，则认为是收入
      const incomeKeywords = ['薪酬', '转入', '退款'];
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
        formatDate(time, 'Y年M月D日 h:i:s'),
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