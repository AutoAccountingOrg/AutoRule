import { BillType, formatDate, RuleObject, splitSms, toFloat } from 'common/index.js';

let rules = [
  {
    // 尾号1234卡9月27日18:55支出(消费支付宝-北京三快在线科技有限公司)45元，余额1,333.22元。【工商银行】
    // 尾号1234卡10月9日19:12收入(微信零钱提现财付通)6.70元，余额0.64元。【工商银行】
    // 尾号1234卡10月14日23:41网上银行支出(无卡支付)4.78元，余额3.46元。
    'regex': /尾号(\d{4})卡(.*?)(网上银行支出|支出|收入)\((.*?)\)([\d,]+(.\d{2})?)元，余额([\d,]+.\d{2})元。/,
    'match': (match) => {
      let [, number, date,type, shopName, money, ] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `工商银行[${type}]`;
      obj.shopName = shopName;
      obj.time = formatDate(date, 'M月D日h:i');

      if (type.indexOf('支出') !==-1) {
        obj.type = BillType.Expend;
      }else{
        obj.type = BillType.Income;
      }

      obj.accountNameFrom = `工商银行(${number})`;
      return obj;
    }
  },
  {
    //尊敬的ETC客户：您好！您的车辆(****7SN)2024年09月26日在福建龙岩铁山站驶入至福建南安梅山站驶出共计通行1次高速公路。上述服务合计消费103.55元，您的账户（尾号：7246）已成功扣款103.55元。为避免影响您使用福建高速ETC，请关注您的扣款账户情况。ETC消费记录详单可登陆“福建高速公路”微信公众号查询或拨打12122进行咨询。如需退订此通知短信请回复“TDXS#FJMT”办理【工商银行】
    'regex': /您的车辆\(.*?\)(.*?)在(.*?)。上述服务合计消费.*?元，您的账户（尾号：(\d{4})）已成功扣款([\d,]+.\d{2})元。为避免影响您使用(.*?)，请关注您的扣款账户情况。/,
    'match': (match) => {
      let [, date, shopItem, number, money, shopName] = match;
      let obj = new RuleObject();

      obj.money = toFloat(money);
      obj.channel = `工商银行[ETC支出]`;
      obj.shopName = shopName;
      obj.shopItem = shopItem;
      obj.time = formatDate(date, 'Y年M月D日');

      obj.type = BillType.Expend;

      obj.accountNameFrom = `工商银行(${number})`;
      return obj;
    }
  }
];

export function get (data) {
  let { sender, bankName, text, t } = splitSms(data);
  if (bankName !== '工商银行') {
    return null;
  }
  for (let rule of rules) {
    const match = text.match(rule.regex);
    if (match) {
      return rule.match(match);
    }
  }
}
