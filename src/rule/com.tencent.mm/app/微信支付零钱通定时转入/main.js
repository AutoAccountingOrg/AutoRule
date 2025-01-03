import { BillType, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '零钱通定时转入成功通知'
];

// 正则表达式和处理函数的映射关系
const rules = [
  [ // 转入金额￥5000.00\n累计转入￥307500.00\n扣款账户招商银行(3598)
    /转入金额[¥￥](\d+\.\d{2})\n累计转入[￥¥](\d+\.\d{2})\n扣款账户(.*?)$/,
    (match, t, item) => {
      const [, money, total, accountNameFrom] = match;
      return new RuleObject(
        BillType.Transfer,
        toFloat(money),
        '零钱通',
        `累计转入¥${total}`,
        accountNameFrom,
        '零钱通',
        0.0,
        transferCurrency('人民币'),
        t,
        '微信[微信支付-零钱通定时转入]'
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
