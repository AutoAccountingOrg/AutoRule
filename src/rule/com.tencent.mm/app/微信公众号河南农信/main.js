import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = '河南农信';
const TITLE = ['账户变动提醒'];

// 定义用于解析文本的正则表达式
const rules = [
  [
    //交易时间：2024年11月09日13时00分\n交易类型：代发入账(尾号1183)\n交易金额：2,564.20/,
    /交易时间：(.*?)\n交易类型：(.*?)\(尾号(\d+)\)\n交易金额：(.*?)$/,
    match => {
      const [, time, type,number, money] = match;
      const accountNameFrom = `${SOURCE_NAME}(${number})`;

      return new RuleObject(
        type.includes('入账') ? BillType.Income : BillType.Expend,
        toFloat(money),
        '',
        type,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],//2024年11月09日13时00分
        formatDate(time, 'Y年M月D日h时i分'),
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
