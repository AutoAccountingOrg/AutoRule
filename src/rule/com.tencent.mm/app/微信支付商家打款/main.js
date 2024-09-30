import { BillType, findNonEmptyString, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '你收到一笔分销佣金',
  '你有一笔收款入账',
  '你收到一笔活动奖励'
];

// 正则表达式和处理函数的映射关系
const rules =[

  [
    /收款金额￥(\d+\.\d{2})\n收款账户(.*?)\n付款商家(.*)(\n付款备注(.*))?/,
    (match,t,item) => {
  let [, money, accountNameFrom, shopName, , shopItem] = match;
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        shopName,
        findNonEmptyString(shopItem, item.title),
        accountNameFrom,
        '',
        0.0,
        transferCurrency("人民币"),
        t,
        '微信[微信支付-收款（商家）]'
      );
    },
  ],
  [
    /收款金额￥(\d+\.\d{2})\n收款方式(.*?)\n转账备注(.*)$/,
    (match,t,item) => {
      let [, money, accountNameFrom, shopItem] = match;
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        item.title,
        shopItem,
        accountNameFrom,
        '',
        0.0,
        transferCurrency("人民币"),
        t,
        '微信[微信支付-收款（商家）]'
      );
    },
  ],
  [
    /收款金额￥(\d+\.\d{2})\n收款方式(.*?)$/,
    (match,t,item) => {
  let [, money, accountNameFrom] = match;

      return new RuleObject(
        BillType.Income,
        toFloat(money),
        item.display_name,
        item.title,
        accountNameFrom,
        '',
        0.0,
        transferCurrency("人民币"),
        t,
        '微信[微信支付-收款（商家）]'
      );
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
