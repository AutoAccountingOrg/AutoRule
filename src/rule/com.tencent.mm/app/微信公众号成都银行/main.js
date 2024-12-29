import { Currency, formatDate, isPaymentType, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '成都银行';
const TITLE = ['交易成功提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：2024年11月17日 00:47:09（尾号7606）\n交易类型：汇兑来账\n交易金额：人民币0.01元\n账户余额：人民币0.83元\n交易说明：如有疑问请致电95507或联系在线客服。
    /交易时间：(.*?)（尾号(\d+)）\n交易类型：(.*?)\n交易金额：人民币(.*?)元\n账户余额：人民币(.*?)元\n交易说明：如有疑问请致电95507或联系在线客服。/,
    match => {
      const [, time, number, type, money] = match;
      let { matchType, typeName } = isPaymentType(type, ['代扣贷款']);
      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        type,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'Y年M月D日 h:i:s'), // 2024年11月17日 00:47:09
        `微信[${SOURCE}-${typeName}]`
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
