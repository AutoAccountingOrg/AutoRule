import { BillType, formatDate, parseWechat, RuleObject, toFloat, transferCurrency } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '中国银行微银行';
const TITLE = ['交易成功提醒', '交易完成通知'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 交易时间：06月13日10:59\n交易类型：数字人民币随用随充（尾号2119）\n交易金额：人民币 207.35\n账户余额：1,504.80元\n交易说明：点击查看更多详情
    // 交易时间：07月04日07:54\n交易类型：转账支出（尾号6960）\n交易金额：人民币 298.78\n账户余额：5,072.39元\n交易说明：点击查看更多详情
    /交易时间：(.*?)\n交易类型：(数字人民币随用随充)（尾号(\d+)）\n交易金额：(.*?) ([\d,]+.\d{2})\n账户余额：.*元\n交易说明：点击查看更多详情/,
    match => {
  const [, time, type, number, currency, money] = match;
      return new RuleObject(
        BillType.Transfer,
        toFloat(money),
        '',
        type,
        `中国银行(${number})`,
        '数字人民币',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[中国银行-数字人民币充值]`
      )

    },
  ],
  [
    // 交易时间：07月04日07:54\n交易类型：转账支出（尾号6960）\n交易金额：人民币 298.78\n账户余额：5,072.39元\n交易说明：点击查看更多详情
    /交易时间：(.*?)\n交易类型：(.*支出|.*消费|.*支付)（尾号(\d+)）\n交易金额：(.*?) ([\d,]+.\d{2})\n账户余额：.*元\n交易说明：点击查看更多详情/,
    match => {
  const [, time, type, number, currency, money] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        '',
        type,
        `中国银行(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[中国银行-消费]`
      )
    }
  ],

  [
    /交易时间：(.*?)\n交易类型：(.*退款)（尾号(\d+)）\n交易金额：(.*?) ([\d\,]+.\d{2})\n账户余额：.*元\n交易说明：点击查看更多详情/,
    match => {
  const [, time, type, number, currency, money] = match;

      return new RuleObject(
        BillType.Income,
        toFloat(money),
        '',
        type,
        `中国银行(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[中国银行-退款]`
      )
    }
  ],
  [//交易时间：09月26日19:05\n交易类型：电子钱包取现（尾号0464）\n交易金额：人民币 36.00\n账户余额：61.04元\n交易说明：点击查看更多详情
   //交易时间：10月25日14:54\n交易类型：工资（尾号xxxx）\n交易金额：人民币 123,4\n账户余额：123,45.69元\n交易说明：点击查看更多详情
    /交易时间：(.*?)\n交易类型：(.*入账|.*转入|.*提现|.*取现|工资)（尾号(\d+)）\n交易金额：(.*?) ([\d,]+(.\d{2})?)\n账户余额：.*元\n交易说明：点击查看更多详情/,
    match => {
      const [, time, type, number, currency, money] = match;
      let billType = BillType.Income;


      return new RuleObject(
        billType,
        toFloat(money),
        '',
        type,
        `中国银行(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[中国银行-入账]`
      );
    },
  ],
  //账户类型：信用卡\n账号尾号：5248\n交易时间：05月16日11:05\n交易类型：存入\n交易金额：RMB357.00
  [
    /账户类型：信用卡\n账号尾号：(\d+)\n交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)([\d\,]+.\d{2})$/,
    match => {
      const [, number, time, type, currency, money] = match;

      let billType = BillType.Income;
      switch (type) {
        case '存入':
          billType = BillType.Income;
          break;
      }

      return new RuleObject(
        billType,
        toFloat(money),
        '',
        type,
        `中国银行信用卡(${number})`,
        '',
        0.0,
        transferCurrency(currency),
        formatDate(time, 'M月D日h:i'),
        `微信[中国银行信用卡-存入]`
      );
    },
  ],
];



/**
 * 获取中国银行规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE, TITLE);
}
