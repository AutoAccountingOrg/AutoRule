import { BillType, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

const SOURCE_NAME = '广东粤通卡ETC服务';
const TITLE = ['高速通行通知'];


let rules = [
  [
    // 车牌号:******\n入口站点:广东浸潭站\n出口站点:广东清新站\n出口时间:2024-09-22 19:45:04\n消费金额:19.95元\n
    /(车牌号:.*?)\n(入口站点:.*?\n出口站点:.*?)\n出口时间:(.*?)\n消费金额:([\d,]+.\d{2})元\n/,
    match =>{
      const [, shopName, shopItem, time, money] = match;

      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        shopItem,
        SOURCE_NAME,
        '',
        0.0,
        transferCurrency("人民币"),
        formatDate(time, 'Y-M-D h:i:s'),
        `微信[${SOURCE_NAME}]`
      )
    }
  ]
]

/**
 * 根据数据获取规则对象
 * @param {string} data - 数据字符串
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data,rules,SOURCE_NAME,TITLE)
}
