import { BillType, Currency, RuleObject, toFloat } from 'common/index.js';

export function get(data) {
  let json = JSON.parse(data)
  if (json.title !== "付款通知") return null;
  // 您的建设银行钱包在广州地铁集团有限公司支付了¥2.40，本次交易已享受优惠，点此查看详情。
  let regex = /您的(.*?)钱包在(.*?)支付了¥([\d,]+.\d{2})，/
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [,card,shopName,money] = match;

  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `数字人民币[支出]`;
  obj.shopName =shopName;
  obj.time = json.t;

  obj.type = BillType.Expend;

  obj.accountNameFrom = `数字人民币(${card})`;
  return obj;
}
