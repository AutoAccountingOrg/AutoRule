import { RuleObject } from 'common/index.js';
import { BillType } from 'common/index.js';
import { Currency } from 'common/index.js';
import { formatDate } from 'common/index.js';
import { toDoubleFloat } from 'common/index.js';

/**
 * @param {string} data - 包含数据的JSON字符串。
 * @returns {RuleObject|null} - 解析后的RuleObject对象，如果解析失败则返回null。
 */
export function get(data) {
  // 解析数据
  data = JSON.parse(data);

  // 创建并返回RuleObject对象
  return new RuleObject(
    BillType.Income,
    toDoubleFloat(data.fee),
    data.hookUser,
    data.status_desc,
    '零钱',
    '',
    0,
    Currency['人民币'],
    formatDate(data.desc_item_list[1].value, 'Y年M月D日 h:i:s'),
    '微信[转账收款]'  );
}
