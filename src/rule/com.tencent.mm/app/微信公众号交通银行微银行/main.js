import { BillType, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '交通银行微银行';
const TITLE = ['账户变动提醒','交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //账号：*7237\n账户名称：交通银行账户\n交易时间：2024-09-25 11:03\n交易类型：网络支付消费\n交易金额：22.60元
    //账号：*3896\n账户名称：交通银行账户\n交易时间：2024-09-27 14:17\n交易类型：其他第三方交行转入\n交易金额：26028.00元
    //账号：*7237\n账户名称：交通银行账户\n交易时间：2024-10-09 08:31\n交易类型：支付平台快捷支付\n交易金额：500.00"
   //交易时间:2024年10月18日 10:43\n交易金额:6205.20元\n交易类型:跨行汇款转入\n交易卡号:*4720\n对方户名:电池材料有限公司
    /账号：\*(\d+)\n账户名称：(.*?)\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(\d+.\d{2})(元)?/,
    (match,t,item) => {
      let [,number,card,time,matchType,money] = match;
      let matchTypeName = '';
      let rawType = matchType;
      if (matchType.indexOf('转入') !== -1) {
        matchTypeName = '收入';
        matchType = BillType.Income;
      }else{
        matchTypeName = '支出';
        matchType = BillType.Expend;
      }

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        rawType,
        `${card}(${number})`,
        '',
        0.0,
        transferCurrency('人民币'),
        formatDate(time, 'Y-M-D h:i'),
        `微信[${SOURCE}-${matchTypeName}]`
      )
    },
  ],
  [
       //交易时间:2024年10月18日 10:43\n交易金额:6205.20元\n交易类型:跨行汇款转入\n交易卡号:*4720\n对方户名:电池材料有限公司
    /交易时间:(.*?)\n交易金额:(\d+.\d{2})元\n交易类型:(.*?)\n交易卡号:\*(\d+)\n对方户名:(.*)$/,
    (match,t,item) => {
      let [,time,money,matchType,number,shopName] = match;
      let matchTypeName = '';
      let rawType = matchType;
      if (matchType.indexOf('转入') !== -1) {
        matchTypeName = '收入';
        matchType = BillType.Income;
      }else{
        matchTypeName = '支出';
        matchType = BillType.Expend;
      }

      return new RuleObject(
        matchType,
        toFloat(money),
        '',
        rawType,
        `交通银行(${number})`,
        '',
        0.0,
        transferCurrency('人民币'),
        formatDate(time, 'Y年M月D日 h:i'),
        `微信[${SOURCE}-${matchTypeName}]`
      )
    },
  ],
];


/**
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
