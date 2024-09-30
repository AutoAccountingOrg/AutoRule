import { BillType, Currency, formatDate, RuleObject, toFloat, findNonEmptyString, parseWechat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLE_WECHAT = [
  '已扣费¥'
];

// 正则表达式和处理函数的映射关系
const rules =[
  [
    // 扣费金额￥4.50\n扣费项目成都地铁微信免密支付\n扣费方式工商银行\n收单机构财付通支付科技有限公司\n乘车路线5号线皇花园-6号线牛王庙\n乘车时间2024-09-23 09:15:38\n备注你在成都地铁的账号成都地铁扣费成功，你可以点击消息管理你的扣费项目

    /扣费金额￥(\d+\.\d{2})\n扣费项目(.*?)\n扣费方式(.*?)\n收单机构(.*?)\n乘车路线(.*?)\n乘车时间(.*?)\n备注(.*?)扣费成功，你可以点击消息管理你的扣费项目/,
    (match,t,item) => {
      const [, money, shopName, accountNameFrom,,shopItem, time,  remark] = match;
      return new RuleObject(
        BillType.Expend,
        toFloat(money),
        shopName,
        shopItem,
        accountNameFrom,
        '',
        0.0,
        Currency['人民币'],
        t,
        '微信[微信支付-扣款]'
      );
    },
  ],
    [
      // 扣费金额￥53.72\n扣费服务滴滴出行\n扣费内容先乘后付\n支付方式零钱通\n收单机构财付通支付科技有限公司
      /扣费金额￥(\d+\.\d{2})\n扣费服务(.*?)\n扣费内容(.*?)\n支付方式(.*?)\n收单机构(.*?)$/,
      (match,t,item) => {
        const [, money, shopName,shopItem, accountNameFrom,, remark] = match;
        return new RuleObject(
          BillType.Expend,
          toFloat(money),
          shopName,
          shopItem,
          accountNameFrom,
          '',
          0.0,
          Currency['人民币'],
          t,
          '微信[微信支付-扣款]'
        );
      },
    ],
    // 扣费金额￥53.72\n扣费服务滴滴出行\n扣费内容先乘后付\n支付方式零钱通\n收单机构财付通支付科技有限公司
    // 扣费金额￥51.70\n扣费服务滴滴出行\n扣费内容先乘后付\n支付方式零钱通\n收单机构财付通支付科技有限公司
    [
      // 扣费金额￥18.50\n扣费项目腾讯王卡微信话费代扣\n支付方式零钱\n收单机构财付通支付科技有限公司\n备注你的江苏联通账号（19999xxxx）扣费成功。如果对扣费有疑问，请联系商户确认
      // 扣费金额￥19.00\n扣费项目Keep会员包月自动续费\n支付方式零钱\n收单机构财付通支付科技有限公司\n备注你的Keep账号（太公摘花）扣费成功。如果对扣费有疑问，请联系商户确认
      //扣费金额￥25.00\n扣费项目迅雷超级会员微信自动续费\n支付方式中国银行储蓄卡(7575)\n收单机构财付通支付科技有限公司\n备注你的深圳市迅雷网络技术有限公司账号（185*****230）扣费成功。如果对扣费有疑问，请联系商户确认
      /扣费金额￥(\d+\.\d{2})\n扣费项目(.*?)\n支付方式(.*?)\n收单机构(.*?)\n备注(.*?)。如果对扣费有疑问，请联系商户确认/,
      (match,t,item) => {
        const [, money, shopName, accountNameFrom,remark,shopItem] = match;
        return new RuleObject(
          BillType.Expend,
          toFloat(money),
          shopName,
          shopItem,
          accountNameFrom,
          '',
          0.0,
          Currency['人民币'],
          t,
          '微信[微信支付-扣款]'
        );
      },
    ],
    //

];


/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  return parseWechat(data, rules, SOURCE_NAME_WECHAT, TITLE_WECHAT);
}
