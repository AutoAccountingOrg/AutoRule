import { BillType } from '../../../../utils/BillType';
import { RuleObject } from '../../../../utils/RuleObject';
import { Currency } from '../../../../utils/Currency';
import { stripHtml } from '../../../../utils/Html';

/**
 * 从给定的数据中提取支付宝红包的相关信息并返回规则对象。
 * @param {string} data - 包含支付宝红包信息的字符串数据。
 * @returns {RuleObject} - 包含支付宝红包相关信息的规则对象。
 */
export function get(data) {
  data = JSON.parse(data);
  let pl = JSON.parse(data[0].pl);
  var dataItems = JSON.parse(pl.templateJson);
  if (pl.templateJson == null) {
    return null;
  }
  return new RuleObject(
    BillType.Income,
    parseFloat(dataItems.statusLine1Text.replace('元', '')),
    stripHtml(dataItems.subtitle),
    dataItems.title,
    '支付宝余额',
    '',
    0,
    Currency['人民币'],
    data[0].mct,
    '支付宝[收红包]',
  );
}
