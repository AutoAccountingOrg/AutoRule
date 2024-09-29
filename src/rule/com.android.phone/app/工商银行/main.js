import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';
export function get(data) {
  let { sender,bankName,text,t } = splitSms(data);
  if (bankName !== "工商银行") return null;
  //尾号1234卡9月27日18:55支出(消费支付宝-北京三快在线科技有限公司)45元，余额1,333.22元。【工商银行】
  let regex  = /尾号(\d{4})卡(.*?)支出\((.*?)-(.*?)\)([\d,]+(.\d{2})?)元，余额([\d,]+.\d{2})元。/;
  const match = text.match(regex);
  if (!match) return null;
  let [,number,date,shopName,shopItem,money,,] = match;

  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `工商银行[支出]`;
  obj.shopName =shopName;
  obj.shopItem = shopItem;
  obj.time = formatDate(date,"M月D日h:i");

  obj.type = BillType.Expend

  obj.accountNameTo = `工商银行(${number})`;
  return obj;
}
