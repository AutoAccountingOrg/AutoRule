import { BillType, Currency, formatDate, RuleObject, toDoubleFloat } from 'common/index.js';

/**
 * @param {string} data - 包含数据的JSON字符串。
 * @returns {RuleObject|null} - 解析后的RuleObject对象，如果解析失败则返回null。
 */
export function get(data) {
  // 解析数据
  data = JSON.parse(data);

  let billType = BillType.Income
  let payTools, channel,t
  if (data.is_payer){
    billType = BillType.Expend
    payTools = data.cachedPayTools
    channel = '微信[转账付款]'
    t = formatDate(data.desc_item_list[0].value, 'Y年M月D日 h:i:s')
  }else {
    payTools = data.status_desc.replace("你已收款，资金已存入","")
    channel = '微信[转账收款]'
    t = formatDate(data.desc_item_list[1].value, 'Y年M月D日 h:i:s')
  }

  // 创建并返回RuleObject对象
  return new RuleObject(
    billType,
    toDoubleFloat(data.fee),
    data.hookUser,
    data.status_desc.replace("%s",""),
    payTools,
    '',
    0,
    Currency['人民币'],
    t,
    `${channel}`  );
}
