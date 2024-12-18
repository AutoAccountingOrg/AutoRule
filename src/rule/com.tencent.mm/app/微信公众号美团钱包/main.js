import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = '美团钱包';
const TITLE = ['支付成功提醒'];

const rules = [
  [
    //支付单号：24111311100301670001712501694723\n支付时间：2024年11月13日 11:52\n支付金额：18.28元\n支付方式：数字人民币
    //支付单号：2412032204388043010906918154 \n支付时间：2024-12-03 22:04:38 \n支付金额：￥79.87 \n支付方式：美团月付
    /支付单号：(.*?)\n支付时间：(.*?)\n支付金额：(.*?)元\n支付方式：(.+)$/,
    match => {
      const [, order, time, money, accountNameFrom] = match;
      let t = 0;
      let _time = time.trim()
      t = formatDate(_time,'Y年M月D日 h:i')
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '美团',
        order,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        `微信[${SOURCE_NAME}-消费]`
      )
    },
  ],
  [
    //支付单号：24111311100301670001712501694723\n支付时间：2024年11月13日 11:52\n支付金额：18.28元\n支付方式：数字人民币
    //支付单号：2412032204388043010906918154 \n支付时间：2024-12-03 22:04:38 \n支付金额：￥79.87 \n支付方式：美团月付
    /支付单号：(.*?) \n支付时间：(.*?) \n支付金额：￥(.*?) \n支付方式：(.+)$/,
    match => {
      const [, order, time, money, accountNameFrom] = match;
      let t = 0;
      let _time = time.trim()
      t = formatDate(_time,'Y-M-D h:i:s')
     return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '美团',
       order,
       accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        `微信[${SOURCE_NAME}-消费]`
     )
    },
  ],
  [
    /退款原因：(.*?)，退回【(.*?)】\n退款金额：(\d+\.\d{2})元（实际退款金额）/,
    (match,t) => {
      const [, shopItem, accountNameFrom, money] = match;

      return new RuleObject(
        BillType.Income,
        toFloat(money),
        '美团',
        shopItem,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        `微信[${SOURCE_NAME}-退款]`
      )
    },
  ],
];


/**
 * @param {string} data - 包含数据的JSON字符串。
 * @returns {RuleObject|null} - 解析后的RuleObject对象，如果解析失败则返回null。
 */
export function get(data) {
 return parseWechat(data, rules, SOURCE_NAME, TITLE)
}
