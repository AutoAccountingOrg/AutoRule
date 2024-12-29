import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '宁波银行';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //交易类型:尾号2582-工资-人民币\n交易时间:09月15日 17:00\n交易对象:大夏公司\n交易金额:1696.49\n可用余额:428.97
    //交易类型:尾号2582-网络支付消费-人民币\n交易时间:09月16日 10:29\n交易对象:拼多多平台商户\n交易金额:58.75\n可用余额:370.22
    //交易类型:尾号2582-网络支付退款-人民币\n交易时间:09月17日 11:35\n交易对象:上海付费通信息服务有限公司\n交易金额:-3.99\n可用余额:374.21
    //交易类型:尾号8888-网络支付退款-人民币\n交易时间:11月12日 11:08\n交易对象:上海付费通信息服务有限公司\n交易金额:-12.79\n可用余额:46.41
    /交易类型:尾号(\d{4})-(.*?)-人民币\n交易时间:(.*?)\n交易对象:(.*?)\n交易金额:(.*?)\n可用余额:(.*?)$/,
    match => {
      let [, number, shopItem, time, shopName, money] = match;
      let billType = BillType.Income;
      let billTypeStr = '收入';
      if (shopItem.indexOf('消费') !== -1) {
        billType = BillType.Expend;
        billTypeStr = '支出';
      }

      return new RuleObject(
        billType,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日 h:i'),
        `微信[${SOURCE}-${billTypeStr}]`
      );
    }
  ]
];

/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
