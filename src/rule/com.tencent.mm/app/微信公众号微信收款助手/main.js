import { BillType, formatDate, RuleObject, toFloat, findNonEmptyString, parseWechat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '微信收款助手';
const TITLE = [
  '经营账户提现到账',
  '微信支付收款元(老顾客第次消费)'
];

// 正则表达式和处理函数的映射关系
const rules =[
  [
    // 提现金额：¥7.00\n提现银行：四川农信(1586)\n提现时间：2024-05-31 08:23:16\n提现到账时间：2024-05-31 08:23:27
    /提现金额：¥(\d+\.\d{2})\n提现银行：(.*?)\n提现时间：.*?\n提现到账时间：(.*?)$/,
    match => {
      const [, money, accountNameTo, time] = match;
      return new RuleObject(
        BillType.Transfer,
        toFloat(money),
        '',
        '',
        '微信经营账户',
        accountNameTo,
        0.0,
        'CNY',
        formatDate(time, 'Y-M-D h:i:s'),
        `微信[${SOURCE}-提现]`
      );
    },
  ],
  // 收款金额￥1.50\n收款店铺A创印（恒晟）广告图文1线\n顾客信息该顾客累计消费4次(捧场老客)\n备注收款成功，已存入经营账户，该笔获得2积分
  [
    /收款金额￥(\d+\.\d{2})\n收款店铺(.*?)\n顾客信息(.*?)\n备注收款成功/,
    (match,t,item) => {
      const [, money, shopName, shopItem] = match;
      return new RuleObject(
        BillType.Income,
        toFloat(money),
        shopName,
        shopItem,
        '微信经营账户',
        '',
        0.0,
        'CNY',
        t,
        `微信[${SOURCE}-经营收款]`
      );
    },
  ],
];


/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data,rules,SOURCE,TITLE)
}
