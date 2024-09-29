import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '京东购物';
const TITLE = ['付款成功通知'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    /实付金额：￥([\d,]+.\d{2})元\n商品详情：(.*?)\n收货地址：(.*?)\n订单编号：(.*?)/,
    (match,t) => {
      const [, money, shopItem, address, orderNo] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '',
        shopItem,
        '',
        '',
        0.0,
        Currency['人民币'],
        t,
        `微信[${SOURCE}-消费]`)
    },
  ],
];



/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
