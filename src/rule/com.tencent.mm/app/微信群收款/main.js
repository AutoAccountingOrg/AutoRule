import { BillType, Currency, RuleObject, toFloat } from 'common/index.js';



/**
 * @param {string} data - 包含数据的JSON字符串。
 * @returns {RuleObject|null} - 解析后的RuleObject对象，如果解析失败则返回null。
 */
export function get(data) {
  // 解析数据
  data = JSON.parse(data);

  if (data.content === undefined)return null;
  if (data.content.mMap === undefined)return null;
  if (data.content.mMap.content === undefined)return null; //你支付了
  const match = data.content.mMap.content.match(/你支付了(.*?)发起的/);
  if (!match) {
    return null;
  }
  let user = match[1];
  // 创建并返回RuleObject对象
  return new RuleObject(
    BillType.Expend,
    toFloat(data.cachedPayMoney),
    user,
    "微信群收款",
    data.cachedPayTools,
    '',
    0,
    Currency['人民币'],
    data.t,
    `微信[群收款付款]`  );
}
