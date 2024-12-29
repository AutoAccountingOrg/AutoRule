import { BillType, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '零钱通收益月报'
];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //10月收益￥2.03\n当前累计收益￥123.43
    /(\d+)月收益￥(\d+\.\d{2})\n当前累计收益￥(\d+\.\d{2})$/,
    (match, t, item) => {
      const [, month, money, totalMoney] = match;
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        '零钱通',
        `当前累计收益￥${totalMoney}`,
        '零钱通',
        '',
        0.0,
        transferCurrency('人民币'),
        t,
        '微信[微信支付-零钱通收益月报]'
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
