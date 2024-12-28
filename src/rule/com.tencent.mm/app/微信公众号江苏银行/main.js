import {
  BillType,
  Currency,
  formatDate,
  isPaymentType,
  parseWechat,
  RuleObject,
  splitShop,
  toFloat
} from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '江苏银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：06月13日 07:38 \n交易类型：尾号6706的信用卡,消费\n交易金额：人民币17.03元\n可用额度：8147.29 元,点击查看热门活动\n交易说明：网银在线（京东支付）-京东商城业务
    // 交易时间：12月24日 22:24 \n交易类型：尾号6706的信用卡,消费\n交易金额：人民币10.00元\n可用额度：9919.01 元,点击查看热门活动\n交易说明：支付宝-杭州深度求索人工智能基础技术研究...
    //交易时间：09月26日 12:21 \n交易类型：尾号6706的信用卡,转账转入\n交易金额：人民币1795.68元\n可用额度：10891.02 元,点击查看热门活动\n交易说明：支付宝-信用卡还款信用卡还款
    //交易时间：10月04日 14:51 \n交易类型：尾号6706的信用卡,退货通知\n交易金额：人民币538.00元\n可用额度：8984.78 元,点击查看热门活动\n交易说明：支付宝-成都卓祥贸易有限公司

    /交易时间：(.*?) \n交易类型：尾号(\d+)的信用卡,(.*?)\n交易金额：人民币(.*?)元\n可用额度：.*? 元,点击查看热门活动\n交易说明：(.*?)$/,
    match => {
      const [, time, number, type, money, shopItem_] = match;
      let { shopName, shopItem } = splitShop(shopItem_);
      let { matchType, typeName } = isPaymentType(type);
      if (type === '转账转入') {
        matchType = BillType.Transfer;
        typeName = '还款';
      }
      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        shopItem,
        matchType === BillType.Transfer ? '' : `江苏银行(${number})`,
        matchType === BillType.Transfer ? `江苏银行(${number})` : '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日 h:i'),
        `微信[${SOURCE}-${typeName}]`
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
  return parseWechat(data, rules, SOURCE, TITLE)
}
