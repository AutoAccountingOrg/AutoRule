import { BillType, Currency, formatDate, parseWechat, RuleObject } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '京东白条';
const TITLE = ['还款成功通知', '交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /还款时间：(.*?)\n还款金额：([\d,]+.\d{2})元/,
    match => {
      const [, time, money] = match;
      return new RuleObject(
        BillType.Transfer,
        parseFloat(money),
        '',
        '',
        '',
        '京东白条',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日'),
        `微信[${SOURCE}-还款]`
      )
    }
  ],
  [
    /服务商户：(.*?)\n交易类型：(.*?)\n交易订单：\d+\n交易时间：(.*?)\n消费金额：(\d+.\d{2})元/,
    match => {
    const [, shopName, shopItem, time, money] = match;
      return new RuleObject(
        BillType.Expend,
        parseFloat(money),
        shopName,
        shopItem,
        '京东白条',
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日 h:i:s'),
        `微信[${SOURCE}-消费]`
      )
    },
  ],
];



/**
 * 获取京东白条还款规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
