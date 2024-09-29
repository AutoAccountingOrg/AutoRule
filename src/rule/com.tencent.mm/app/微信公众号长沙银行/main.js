import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = '长沙银行';
const TITLE = ['交易成功提醒'];

// 定义用于解析文本的正则表达式
const rules = [
  [
    /交易时间：(.*?)\n交易类型：(.*?)（个人账户：尾号(\d{4})）\n交易金额：人民币(.*?)元\n账户余额：.*?\n交易说明：(.*)?/,
    match => {
      const [, time, type, account, money, shopItem] = match;
      const accountNameFrom = `长沙银行（${account}）`;

      return new RuleObject(
        type.includes('取出') ? BillType.Expend : BillType.Income,
        toFloat(money),
        '',
        shopItem,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'M月D日h:i'),
        `微信[${SOURCE_NAME}-交易]`
      );
    }
  ]
]



/**
 * 处理数据并返回结果
 * @param {string} data - 要处理的数据
 * @returns {RuleObject|null} - 处理结果对象，如果处理失败则返回null
 */
export function get(data) {
  return parseWechat(data,rules,SOURCE_NAME,TITLE)
}
