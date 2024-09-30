import { BillType, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '微信支付收款.*'
];

// 正则表达式和处理函数的映射关系
const rules =[

  [
    // 收款金额￥1500.00\n收款店铺jyf\n顾客信息新顾客消费\n备注收款成功，已存入经营账户
    /收款金额￥(\d+\.\d{2})\n收款店铺(.*?)\n顾客信息(.*?)\n备注(.*?)$/,
    (match,t,item) => {
      const [, money, shopName, , shopItem] = match;
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        shopName,
        shopItem,
        "微信经营账户",
        '',
        0.0,
        transferCurrency("人民币"),
        t,
        '微信[微信支付-经营收款]',
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
