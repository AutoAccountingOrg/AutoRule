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
const SOURCE = '兴业银行信用卡';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易时间：11月24日19点37分59秒成功交易\n交易类型：消费(尾号0000信用卡)\n交易金额：6.80人民币\n可用额度：0000.00元\n交易说明：抖音支付快捷--抖店平台商户
    //5月7日10:50
    /交易时间：(.*?)成功交易\n交易类型：(.*?)\(尾号(\d+)信用卡\)\n交易金额：([\d,]+.\d{2})人民币\n可用额度：.*?元\n交易说明：(.*?)$/,
    match => {
      let [, time, type, number, money, shopItem_] = match;

      let { matchType, matchTypeName } = isPaymentType(type);

      let { shopName, shopItem } = splitShop(shopItem_, null, '--');

      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        transferCurrency('人民币'), // 2024年09月22日  20:40
        formatDate(time, 'M月D日h点i分s秒'),
        `微信[${SOURCE}-${matchTypeName}]`
      );
    }
  ]
];

export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
