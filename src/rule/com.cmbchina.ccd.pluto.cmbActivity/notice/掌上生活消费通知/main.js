import { BillType, RuleObject, splitShop, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 信用卡通知：您尾号1356的招行信用卡消费6225.34人民币。
  // 信用卡通知：您尾号1356的招行信用卡预授权1,362.41人民币。
  // 您在美团支付-美团App酱新香酥鸡饼(鸡柳拌饼益有一笔29.96人民币的消费已成功，点击查看详情【消费达标集喵赢好礼，限特邀用户，戳此>>】
  let regex = /您在(.*?)有一笔(.*?)人民币的消费已成功，点击查看详情/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }

  let obj = new RuleObject();

  let [, shopItem_, money] = match;
  let { shopName, shopItem } = splitShop(shopItem_);
  obj.money = toFloat(money);
  obj.channel = `掌上生活[信用卡消费]`;
  obj.shopName = shopName;
  obj.shopItem = shopItem;
  obj.time = json.t;
  obj.type = BillType.Expend;

  obj.accountNameFrom = `招商银行信用卡`;
  return obj;
}
