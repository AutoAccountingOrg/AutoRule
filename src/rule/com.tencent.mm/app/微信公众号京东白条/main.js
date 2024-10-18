import { BillType, Currency, formatDate, parseWechat, RuleObject } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '京东白条';
const TITLE = ['还款成功通知', '交易提醒','交易成功通知'];

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

  // 商户名称：福建乐摩物联科技股份有限公司\n订单金额：11.73元\n支付方式：京东付款码打白条\n交易时间：10月02日14:24\n订单编号：1396172787903633744174
  [
    /商户名称：(.*?)\n订单金额：(\d+.\d{2})元\n支付方式：(.*?)\n交易时间：(.*?)\n订单编号：(.*?)$/,
    match => {
      const [,shopName,money, , time,order] = match;
      return new RuleObject(
        BillType.Transfer,
        parseFloat(money),
        shopName,
        order,
        '京东白条',
        '',
        0.0,
        Currency['人民币'],//10月02日14:24
        formatDate(time, 'M月D日h:i'),
        `微信[${SOURCE}-消费]`
      )
    }
  ],


  [
  // 服务商户：京东平台商户\n交易类型：不分期\n交易订单：付款先享后付\n交易时间：09月25日 08:31:56\n消费金额：15.07元
    /服务商户：(.*?)\n交易类型：(.*?)\n交易订单：(.*?)\n交易时间：(.*?)\n消费金额：(\d+.\d{2})元/,
    match => {
    const [, shopName, shopItem, ,time, money] = match;
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
