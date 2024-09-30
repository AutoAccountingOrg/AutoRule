import {
  BillType,
  Currency,
  formatDate,
  RuleObject,
  toFloat,
  findNonEmptyString,
  parseWechat,
  transferCurrency
} from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '转账到银行卡到账成功'
];

// 正则表达式和处理函数的映射关系
const rules =[
  [
    //转账金额¥1500.00\n收款方鲍灯兴\n收款账号农业银行(8879)\n到账时间2024-09-19 11:42\n备注转账资金已到账对方银行卡账户
    /转账金额¥(\d+\.\d{2})\n收款方(.*?)\n收款账号(.*?)\n到账时间(.*?)\n备注(.*?)$/,
    match => {
      const [, money, shopName, accountTo,time, shopItem] = match;
     return new RuleObject(
        BillType.Transfer,
        toFloat(money),
       shopName,
       shopItem,
        '微信零钱',
       accountTo,
        0.0,
        transferCurrency("人民币"),
        formatDate(time,'Y-M-D h:i'),
        '微信[微信支付-转账到银行卡]'
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
  return parseWechat(data, rules, SOURCE_NAME_WECHAT, TITLE_WECHAT);
}
