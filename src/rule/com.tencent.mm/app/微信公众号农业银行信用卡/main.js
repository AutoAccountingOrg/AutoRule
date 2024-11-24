import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '农业银行信用卡';
const TITLE = ['交易成功通知'];

// 正则表达式和处理函数的映射关系
const rules = [
  // 支出规则
  [
    /交易时间：(.*?)\n交易类型：卡号尾号（(\d+)），网上支付\n交易金额：([\d,]+.\d{2})元\n可用余额：.*?元\n交易地址：(.*?)，(.*?)$/,
    match => {
      const [, time, number, money, shopName, shopItem] = match;

      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'),
        `${shopName}[${SOURCE}-消费]`
      )
    },
  ],
  // 收入规则（刷卡金返现收入）
  [
    /交易时间：(.*?)\n交易类型：卡号尾号（(\d+)），刷卡金转入\n交易金额：([\d,]+.\d{2})元\n可用余额：.*?元\n交易地址：(.*?),消费时间.*$/,
    match => {
      const [, time, number, money, description] = match;

      return new RuleObject(
        BillType.Income,  // 收入类型
        toFloat(money),
        SOURCE,
        description,     // 描述（如：天天返现）
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'),
        `刷卡金返现[${SOURCE}-收入]`
      )
    },
  ],
];



/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
