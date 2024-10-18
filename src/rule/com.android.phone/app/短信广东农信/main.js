import { BillType, Currency, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

export function get(data) {
  let { sender,bankName,text,t } = splitSms(data);
  if (bankName !== "广东农信") return null;
  // 您尾数0666的卡号09月25日12:09补助款收入人民币1000.00元,余额8888.12元。【和平农商银行】
  let regex  = /您尾数(\d{4})的卡号(\d{2}月\d{2}日\d{2}:\d{2})(.*?)(收入|支出)(.*?)([\d,]+.\d{2})元,余额([\d,]+.\d{2})元。/
  //【广东农信】您尾数0000的卡号10月01日00:05财付通支付支出人民币5.00元,余额0000.87元。【和平农商银行】
  const match = text.match(regex);
  if (!match) return null;
  let [,number,date,shopItem,type,currency,money,] = match;

  let obj = new RuleObject();

  obj.money = toFloat(money);
  obj.channel = `广东农信[${type}]`;
  obj.shopName ="广东农信";
  obj.shopItem = shopItem;
  obj.currency = Currency[currency];
  obj.time = formatDate(date,"M月D日h:i");

  if (type === "支出") obj.type = BillType.Expend
  else obj.type = BillType.Income

  obj.accountNameFrom = `广东农信(${number})`;
  return obj;
}
