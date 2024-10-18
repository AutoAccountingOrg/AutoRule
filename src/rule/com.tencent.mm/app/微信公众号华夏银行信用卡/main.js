import { BillType, Currency, formatDate, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '华夏银行信用卡';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    //卡片尾号:3838\n交易时间:2024年10月10日 11:01\n交易类型:消费，中国移动\n交易金额:人民币29.97元\n交易附言:可用额度31955.11元，分期3折起！
    /卡片尾号:(\d{4})\n交易时间:(.*?)\n交易类型:(.*?)，(.*?)\n交易金额:(.*?)元\n交易附言:(.*?)$/,
    match => {
      const [, number,time,type,shopName, money, shopItem] = match;

      return new RuleObject(
        type.indexOf('消费') !== -1 ? BillType.Expend : BillType.Income,
        toFloat(money),
        shopName,
        shopItem,
        `${SOURCE}(${number})`,
        '',
        0.0,
        Currency['人民币'],//2024年10月10日 11:01
        formatDate(time, 'Y年M月D日 h:i'),
        `微信[${SOURCE}-${type}]`
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
  return parseWechat(data, rules, SOURCE, TITLE);
}
