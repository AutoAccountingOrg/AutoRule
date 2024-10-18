import { BillType, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '零钱通转出到账'
];

// 正则表达式和处理函数的映射关系
const rules =[
  [
    /转出金额￥(\d+\.\d{2})\n到账账户(.*?)\n转出时间(.*?)\n到账时间(.*?)\n备注(.*?)$/,
    (match,t,item) => {
      const [, money,accountTo,startTime,endTime,remark] = match;
      return new RuleObject(
        BillType.Transfer,
        toFloat(money),
        '零钱通',
        remark,
        '零钱通',
        accountTo,
        0.0,
        transferCurrency("人民币"),
        t,
        '微信[微信支付-零钱通转出到账]'
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
