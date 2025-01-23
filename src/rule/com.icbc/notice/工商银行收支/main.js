import { formatDate, isPaymentType, RuleObject, splitShop, toFloat } from 'common/index.js';

export function get (data) {
  let json = JSON.parse(data);
  // 尾号1054卡1月5日15:00收入(退款支付宝-支付宝-消费)3.70元，余额1,108.67元。
  // 尾号1054卡1月12日15:56支出(消费支付宝-谢水生)4元，余额873.02元。
  // 尾号9301卡1月18日16:00支出(缴费财付通-北京科技大学)5元。
  let regex = /尾号(\d{4})卡(\d{1,2}月\d{1,2}日\d{1,2}:\d{1,2})(.*?)\(([^)]+)\)(.*?)元(?:，余额)?/;
  const match = json.text.match(regex);
  if (!match) {
    return null;
  }
  let [, card, time, type, shopItem_, money] = match;
  let obj = new RuleObject();
  let { shopName, shopItem } = splitShop(shopItem_);
  let { matchType, typeName } = isPaymentType(type);

  obj.money = toFloat(money);
  obj.channel = `工商银行[${typeName}]`;
  obj.shopName = shopName;
  obj.shopItem = shopItem;
  obj.time = formatDate(time, 'M月D日h:i');

  obj.type = matchType;

  obj.accountNameFrom = `工商银行(${card})`;
  return obj;
}
