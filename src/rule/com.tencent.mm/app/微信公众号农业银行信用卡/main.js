import { BillType, Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '农业银行信用卡';
const TITLE = ['交易成功通知'];

// 正则表达式和处理函数的映射关系
const rules = [
  // 支出规则
  [
    // 交易时间：2024-12-09 11:54:03\n交易类型：卡号尾号（8487），消费\n交易金额：505.00元\n可用余额：5212.39元\n交易地址：上海秋实企业管理有限公司
    /交易时间：(.*?)\n交易类型：卡号尾号（(\d+)），(.*?)\n交易金额：([\d,]+.\d{2})元\n可用余额：.*?元\n交易地址：(.*?)$/,
    match => {
      const [, time, number, type, money, shopItem_] = match;
      let { matchType, typeName } = isPaymentType(type);
      //let {shopName, shopItem} = splitShop(shopItem_,null,",")
      return new RuleObject(
        matchType,
        toFloat(money),
        type,
        shopItem_,  // 如果没有详细描述，则使用商户名称作为描述
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'),
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ],

  // 收入规则（退款收入）
  [
    /交易时间：(.*?)\n交易类型：卡号尾号（(\d+)），退货\n交易金额：([\d,]+.\d{2})元\n可用余额：.*?元\n交易地址：(.*)$/,
    match => {
      const [, time, number, money, description] = match;
      return new RuleObject(
        BillType.Income,  // 收入类型
        toFloat(money),
        description,      // 商户名称（如：多多支付退款）
        description,      // 描述
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'),
        `微信[${SOURCE}-收入]`
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
