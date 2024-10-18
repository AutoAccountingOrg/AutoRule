import { BillType, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '浦发银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易时间：10月09日 10:56:54 网上银行\n交易类型：网上支付-美团支付\n交易金额：人民币活期-19.80\n可用额度：点击查看账户详情（尾号4113）\n交易说明：浦发银行竭诚为您服务！
    /交易时间：(.*?) 网上银行\n交易类型：(.*?)\n交易金额：(.*?)活期(.*?)\n可用额度：点击查看账户详情（尾号(\d{4})）\n交易说明：(.*?)$/,
      match => {

    let [, time, shopName,currency, money,number, shopItem] = match;
     return new RuleObject(
      money.indexOf('-') === -1 ? BillType.Income : BillType.Expend,
      toFloat(money),
      '',
      shopItem,
      `浦发银行(${number})`,
      '',
      0.0,
      transferCurrency(currency),
      formatDate(time, 'M月D日 h:i:s'),
      `微信[${SOURCE}-交易]`)
    },
  ],
];


/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
 return parseWechat(data, rules, SOURCE, TITLE)
}
