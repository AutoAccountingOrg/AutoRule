import { BillType, Currency, parseWechat, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '微信支付凭证'
];

// 正则表达式和处理函数的映射关系
const rules =[
  [
    //付款金额￥13.00\n手环名称小米手环8 Pro\n商品名称SIOS|124|31\n付款方式零钱\n收单机构财付通支付科技有限公司
    /付款金额￥(\d+\.\d{2})\n手环名称(.*?)\n商品名称(.*?)\n付款方式(.*?)\n收单机构财付通支付科技有限公司/,
    (match,t,item) => {
        let [, money,payTool,shopItem, accountNameFrom] = match;
        return new RuleObject(
          BillType.Expend,
          toFloat(money),
          item.display_name,
          shopItem,
          accountNameFrom,
          '',
          0.0,
          Currency['人民币'],
          t,
          `微信[微信支付-手环支付]`
        );
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
