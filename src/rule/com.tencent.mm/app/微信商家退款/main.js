import {
  BillType,
  Currency,
  formatDate,
  RuleObject,
  toFloat,
  findNonEmptyString,
  parseWechat,
  transferCurrency
} from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '退款到账通知'
];

// 正则表达式和处理函数的映射关系
const rules =[
    [
      // 退款金额¥166.60\n商品详情美团订单-24052911100400001306304144901069\n商户名称美团\n退款方式退回支付卡(建设银行8254)\n退款原因[2406010080800792069]退交易\n到账时间2024-06-01 20:35:34",
      /退款金额¥(\d+\.\d{2})\n商品详情(.*?)\n商户名称(.*?)\n退款方式退回(.*?)\n(退款原因.*?\n)?到账时间(.*?)$/,
      match => {
        const [, money,shopItem, shopName, accountNameFrom,, time] = match;
  return new RuleObject(
    BillType.Income,
    toFloat(money),
    shopName,
    shopItem,
    accountNameFrom,
    '',
    0.0,
    transferCurrency("人民币"),
    formatDate(time, 'Y-M-D h:i:s'),
    '微信[微信支付-商家退款]',
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
  return parseWechat(data, rules, SOURCE_NAME_WECHAT, TITLE_WECHAT);
}
