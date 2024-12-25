import { BillType, Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = 'ETC助手';
const TITLE = ['ETC扣费成功通知'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 通行流水号：陕FF93513\n通行时间：2024-11-24 16:42:17\n扣费时间：2024-11-24 19:36:44\n通行详情：陕西新街子收费站驶入-陕西略阳收费站驶出\n金额：42.64元,出行频繁,请速领高速券
    /通行流水号：(.*?)\n通行时间：(.*?)\n扣费时间：(.*?)\n通行详情：(.*?)\n金额：(.*?)元,出行频繁,请速领高速券/,
    match => {
    const [, shopName,t,time,shopItem,money] = match;

      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        shopItem,
        '',
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y-M-D h:i:s'), // 11月14日 14:45
        `微信[${SOURCE}]`
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
  return parseWechat(data, rules, SOURCE, TITLE);
}
