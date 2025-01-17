import {
  formatDate,
  isPaymentType,
  parseWechat,
  RuleObject,
  splitShop,
  toFloat,
  transferCurrency
} from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '浦发银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易时间：10月09日 10:56:54 网上银行\n交易类型：网上支付-美团支付\n交易金额：人民币活期-19.80\n可用额度：点击查看账户详情（尾号4113）\n交易说明：浦发银行竭诚为您服务！
    //交易时间：12月16日  08:21:39 网上银行\n交易类型：网上支付-翼支付\n交易金额：人民币活期-5.00\n可用额度：点击查看账户详情（尾号1234）\n交易说明：点击了解浦发银行App，解锁更多服务功能！
    /交易时间：(.*?) 网上银行\n交易类型：(.*?)\n交易金额：(.*?)活期(.*?)\n可用额度：点击查看账户详情（尾号(\d{4})）\n交易说明：(.*?)$/,
    match => {

      let [, time, type, currency, money, number] = match;
      let { matchType, typeName } = isPaymentType(type);
      let { shopName, shopItem } = splitShop(type);
      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        shopItem,
        `浦发银行(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time.replace('  ', ' '), 'M月D日 h:i:s'),
        `微信[${SOURCE}-交易]`);
    }
  ],
  [
    //交易时间：01月10日  19:42:21\n交易类型：其他代发工资\n交易金额：人民币活期+6,8\n可用额度：点击查看账户详情（尾号4528）\n交易说明：2024年度账单来了，快来查收您这一年的回忆吧！
    /交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)活期\+([\d,]+)\n可用额度：点击查看账户详情（尾号(\d{4})）\n交易说明：(.*?)$/,
    match => {
      let [, time, type, currency, money, number] = match;
      let { matchType, typeName } = isPaymentType(type);
      let { shopName, shopItem } = splitShop(type);
      return new RuleObject(
        matchType,
        toFloat(money.replace(',', '')),
        shopName,
        shopItem,
        `浦发银行(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time.replace('  ', ' '), 'M月D日 h:i:s'),
        `微信[${SOURCE}-交易]`);
    }
  ],
  [
    //交易时间：01月17日  08:49:27\n交易类型：消费:成都天府通金融支\n交易金额：人民币活期-4.40\n可用额度：点击查看账户详情（尾号7372）\n交易说明：2024年度账单来了，快来查收您这一年的回忆吧！
    /交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)活期(.*?)\n可用额度：点击查看账户详情（尾号(\d{4})）\n交易说明：(.*?)$/,
    match => {
      let [, time, type, currency, money, number] = match;
      let { matchType, typeName } = isPaymentType(type);
      let { shopName, shopItem } = splitShop(type, null, ':');
      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        shopItem,
        `浦发银行(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time.replace('  ', ' '), 'M月D日 h:i:s'),
        `微信[${SOURCE}-交易]`);
    }
  ]
];

/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
