import { Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '拉卡拉微商服';
const TITLE = ['实时交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 商户名称：XXXX店铺\n交易金额：2,034.00\n交易时间：2025年01月01日 15:35:22\n支付方式：微信，扫码消费（主扫），流水号：66201167903595\n订单类型：82211005399021G（B2433763）
    /商户名称：(.*?)\n交易金额：(.*?)\n交易时间：(.*?)\n支付方式：(.*?)，流水号：(\d+)\n订单类型：(.*?)$/,
    match => {
      const [, shopName, money, time, account, serialNumber, orderType] = match;
      return new RuleObject(
        'Expend',
        toFloat(money.replace(/,/g, '')),
        shopName,
        `订单类型：${orderType}`,
        account,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i:s'), // 2025年01月01日 15:35:22
        `微信[${SOURCE}-扫码消费]`
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
