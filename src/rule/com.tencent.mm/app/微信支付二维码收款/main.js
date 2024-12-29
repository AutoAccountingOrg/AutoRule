import { BillType, findNonEmptyString, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '微信支付收款元(朋友到店)',
  '个人收款码到账¥'
];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /收款金额￥(\d+\.\d{2})\n(付款方备注(.*?)\n)?汇总(.*?)\n备注.*/,
    (match, t, item) => {
      let [, money, remark1, shopName, shopItem] = match;
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        findNonEmptyString(shopName, item.display_name),
        shopItem,
        '微信零钱',
        '',
        0.0,
        transferCurrency('人民币'),
        t,
        '微信[微信支付-二维码收款]'
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
  return parseWechat(data, rules, SOURCE_NAME_WECHAT, TITLE_WECHAT);
}
