import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '江苏银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：06月13日 07:38 \n交易类型：尾号6706的信用卡,消费\n交易金额：人民币17.03元\n可用额度：8147.29 元,点击查看热门活动\n交易说明：网银在线（京东支付）-京东商城业务
    /交易时间：(.*?) \n交易类型：尾号(\d+)的信用卡,消费\n交易金额：人民币(.*?)元\n可用额度：.*? 元,点击查看热门活动\n交易说明：(.*?) /,
    match => {
      const [, time, number, money, shopItem] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '',
        shopItem,
        `江苏银行(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日 h:i'),
        `微信[${SOURCE}-消费]`
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
