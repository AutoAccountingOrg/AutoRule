import { BillType, Currency, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '已支付¥',
  '¥ paid'
];

// 正则表达式和处理函数的映射关系
const rules =[
  [
    /付款金额￥(\d+\.\d{2})\n付款方式(.*?)\n收单机构.*/,
    (match,t,item) => {
      let [, money, accountNameFrom] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        item.display_name,
        '',
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        '微信[微信支付-在线支付]'
      );
    },
  ],
  [
    //
    /使用(.*?)支付[¥￥](\d+\.\d{2})\n收单机构.*/,
    (match,t,item) => {
      let [, accountNameFrom,money] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        item.display_name,
        '',
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        '微信[微信支付-在线支付]'
      );
    },
  ],
  [
    //Paid by Balance¥3900.00\nAcquirer财付通支付科技有限公司
    /Paid by (.*?)¥(\d+\.\d{2})\nAcquirer(.*?)$/,
    (match,t,item) => {
      let [, accountNameFrom, money,shopName] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        item.display_name,
        shopName,
        accountNameFrom === "Balance"? '微信零钱': accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        '微信[微信支付-在线支付]'
      );
    },
  ],
  //
];


/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE_NAME_WECHAT, TITLE_WECHAT);
}
