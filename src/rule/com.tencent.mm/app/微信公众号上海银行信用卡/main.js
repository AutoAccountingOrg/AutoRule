import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, splitShop, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '上海银行信用卡';
const TITLE = ['交易成功提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：01月17日 01:31\n交易类型：消费\n交易金额：人民币22.74元 尾号4657美团信用卡\n交易商户：美团-美团App真好嘢粤菜点心老字号（宝安店\n可用额度：37977.26元
    /交易时间：(.*?)\n交易类型：(.*?)\n交易金额：人民币(.*?)元 尾号(\d+)(.*?)信用卡\n交易商户：(.*?)\n可用额度：(.*?)元/,
    match => {
      const [, time, type, money, number, , _shopItem] = match;
      let { matchType, typeName } = isPaymentType(type);
      let { shopName, shopItem } = splitShop(_shopItem);
      return new RuleObject(
        matchType,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日 h:i'), // 01月17日 01:31
        `微信[${SOURCE}-${typeName}]`
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
  return parseWechat(data, rules, SOURCE, TITLE);
}
