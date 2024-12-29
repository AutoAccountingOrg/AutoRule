import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = '黑龙江省农村信用社';
const TITLE = ['交易提醒'];

// 定义用于解析文本的正则表达式
const rules = [
  [
    /交易时间：(.*?)\n交易类型：(.*?)\n交易金额：(.*?)元\n卡内余额：.*?元/,
    match => {
      const [, time, type, money] = match;
      const accountNameFrom = SOURCE_NAME;

      return new RuleObject(
        type.includes('存入') ? BillType.Income : BillType.Expend,
        toFloat(money),
        '',
        type,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],//2024-10-29 14:02:21
        formatDate(time, 'Y-M-D h:i:s'),
        `微信[${SOURCE_NAME}-交易]`
      );
    }
  ]
];

/**
 * 处理数据并返回结果
 * @param {string} data - 要处理的数据
 * @returns {RuleObject|null} - 处理结果对象，如果处理失败则返回null
 */
export function get (data) {
  return parseWechat(data, rules, SOURCE_NAME, TITLE);
}
