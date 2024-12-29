import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = '美团';
const TITLE = ['支付成功通知', '退款通知'];

const rules = [
  [
    /消费账户：(.*?)\n支付金额：(人民币)?(.*?)元\n支付方式：(.*?)\n支付时间：(.+)$/,
    match => {
      const [, shopItem, , money, accountNameFrom, time] = match;
      let t = 0;
      let _time = time.trim();
      if (_time.indexOf('-') !== -1) {
        t = formatDate(time.trim(), 'Y-M-D h:i:s');
      } else {
        t = formatDate(time.trim(), 'Y年M月D日 h:i');
      }
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '美团',
        shopItem,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        `微信[${SOURCE_NAME}-消费]`
      );
    }
  ],
  [
    /退款原因：(.*?)，退回【(.*?)】\n退款金额：(\d+\.\d{2})元（实际退款金额）/,
    (match, t) => {
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
      );
    }
  ]
];

/**
 * @param {string} data - 包含数据的JSON字符串。
 * @returns {RuleObject|null} - 解析后的RuleObject对象，如果解析失败则返回null。
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE_NAME, TITLE);
}
