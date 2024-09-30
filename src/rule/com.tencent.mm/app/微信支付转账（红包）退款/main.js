import {
  BillType,
  Currency,
  formatDate,
  RuleObject,
  toFloat,
  parseWechat,
  transferCurrency
} from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '转账过期退款到账通知',
  '转账退款到账通知',
  '红包退款到账通知'
];

// 正则表达式和处理函数的映射关系
const rules =[
  [
    /退款金额￥(\d+\.\d{2})\n退款方式退回(.*?)\n退款原因(.*?)\n(到账|退款)时间(.*?)\n.*/,
    (match,t,item) => {
      const [, money, accountNameFrom, shopItem, , time] = match;
      let channel = item.title.replace("到账通知","")
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        '微信退款',
        shopItem,
        accountNameFrom,
        '',
        0.0,
        transferCurrency("人民币"),
        formatDate(time,'Y-M-D h:i:s'),
        `微信[微信支付-${channel}]`
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
