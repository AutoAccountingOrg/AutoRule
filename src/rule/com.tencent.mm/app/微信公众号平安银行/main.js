import { formatDate, isPaymentType, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '平安银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //账号：尾号6274的账户\n交易时间：2024年05月23日09:14\n交易类型：财付通快捷支付(微信红包-微信红包)\n交易币种：人民币\n交易金额：0.01
    // 账号：尾号8888的账户\n交易时间：2024年10月23日14:07\n交易类型：支付宝快捷支付(中国电信股份有限公司-商...\n交易币种：人民币\n交易金额：28.73
    /账号：尾号(\d+)的账户\n交易时间：(.*?)\n交易类型：(.*?)\((.*?)\n交易币种：(.*?)\n交易金额：([\d,]+.\d{2})$/,
    match => {
      const [, number, time, type, shopItem, currency, money] = match;
      let { matchType, typeName } = isPaymentType(type);

      return new RuleObject(
        matchType,
        toFloat(money),
        type,
        shopItem.replace(/\)$/, ''),
        `${SOURCE}(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'Y年M月D日h:i'),
        `微信[${SOURCE}-${typeName}]`
      );
    }
  ],
  [
    //账号：尾号8888\n交易时间：10月16日 18:30\n交易类型：红包提现转入\n交易币种：人民币\n交易金额：3.80元
    // 账号：尾号6274\n交易时间：6月14日 16:33\n交易类型：转账转出\n交易币种：人民币\n交易金额：0.01元
    /账号：尾号(\d+)\n交易时间：(.*?)\n交易类型：(.*?)\n交易币种：(.*?)\n交易金额：(.*?)元/,
    match => {
      const [, number, time, type, currency, money] = match;

      let { matchType, typeName } = isPaymentType(type);

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        type,
        `${SOURCE}(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日 h:i'),
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
