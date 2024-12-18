import { BillType, Currency, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '已支付¥',
  '微信支付凭证'
];

// 正则表达式和处理函数的映射关系
const rules =[
  [
    //支付金额￥29.00\n支付方式零钱\n收单机构财付通支付科技有限公司
    /(付款|支付)金额￥(\d+\.\d{2})\n(付款|支付)方式(.*?)\n收单机构(.*?)$/,
    (match,t,item) => {
        let [,, money, ,accountNameFrom,shopItem] = match;
        return new RuleObject(
          BillType.Expend,
          toFloat(money),
          item.display_name,
          shopItem,
          accountNameFrom,
          '',
          0.0,
          Currency['人民币'],
          t,
          '微信[微信支付-付款]'
        );
    },
  ],
  [
    // 付款金额¥10.00\n支付方式徽商银行储蓄卡\n交易状态支付成功，对方已收款
    /付款金额¥(\d+\.\d{2})\n支付方式(.*?)\n交易状态(.*?)$/,
    (match,t,item) => {
      const [, money, accountNameFrom,shopItem] = match;

      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        item.display_name,
        item.cachedPayShop,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        '微信[微信支付-付款]'
      );
    },
  ],
  [
    // 付款金额￥5.00\n收款方发财\n交易状态支付成功，对方已收款
    /付款金额￥(\d+\.\d{2})\n收款方(.*?)\n交易状态(.*?)$/,
    (match,t,item) => {
      const [, money, shopName,shopItem] = match;

      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        item.cachedPayShop,
        item.cachedPayTools,
        '',
        0.0,
        Currency['人民币'],
        t,
        '微信[微信支付-付款]'
      );
    },
  ],
  [
    //使用零钱支付¥17.30\n车牌宁A·T4386\n交易状态支付成功，对方已收款
    /使用(.*?)支付¥(\d+\.\d{2})\n交易(状态|狀態)支付成功，([对對])方已收款/,
    (match,t,item) => {
      let [, accountNameFrom, money] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        item.display_name,
        item.cachedPayShop,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        '微信[微信支付-付款]'
      );
    },
    ],
    [
      //使用零钱支付¥17.30\n车牌宁A·T4386\n交易状态支付成功，对方已收款
      /使用(.*?)支付¥(\d+\.\d{2})\n车牌(.*?)\n交易(状态|狀態)支付成功，([对對])方已收款/,
      (match,t,item) => {
        let [, accountNameFrom, money,shopItem] = match;
        return new RuleObject(
          BillType.Expend,
          toFloat(money),
          item.display_name,
          shopItem,
          accountNameFrom,
          '',
          0.0,
          Currency['人民币'],
          t,
          '微信[微信支付-付款]'
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
