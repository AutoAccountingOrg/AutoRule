import { BillType, Currency, formatDate, parseWechat, RuleObject, splitShop, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '招商银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易卡号:**** 5157\n交易时间:11月07日 11:50\n交易类型:财付通-微信支付-群收款快捷支付扣款\n交易金额:人民币20.00元
    /交易卡号:.*? (\d+)\n交易时间:(.*?)\n交易类型:(.*?)\n交易金额:人民币(.*?)元/,
    match => {
      const [,number, time, shopItem_, money] = match;
      let {shopName,shopItem} = splitShop(shopItem_);
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日 h:i'),
        `微信[${SOURCE}-消费]`)
    }
  ],
];


/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE)
}
