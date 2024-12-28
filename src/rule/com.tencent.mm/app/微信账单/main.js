import { BillType, convertToNumber, Currency, formatDate, RuleObject, toFloat } from 'common/index.js';

// 定义源名称和需要匹配的标题数组
const SOURCE = '微信支付';
const TITLE = ['交易提醒'];

// 正则表达式和处理函数的映射关系
const rules = [
  [
    // 当前状态：支付成功\n支付时间：1733816116\n商品：普通充值\n商户全称：杭州深度求索人工智能基础技术研究有限公司\n收单机构：财付通支付科技有限公司\n支付方式：零钱\n交易单号：4200002372202412105648962911\n商户单号：wechat43a77b59699749d39eeba92643
    /当前状态：支付成功\n支付时间：(.*?)\n商品：(.*?)\n商户全称：(.*?)\n收单机构：(.*?)\n支付方式：(.*?)\n交易单号：(.*?)\n商户单号：(.*?)/,
    match => {
      const [, time, product, merchant, institution, paymentMethod, transactionId, merchantId] = match;
      return new RuleObject(
        'Expend',
        toFloat(1.00),
        merchant,
        product,
        '微信支付(零钱)',
        '',
        0.0,
        Currency['人民币'],
        formatDate(time, 'X'), // 1733816116
        `微信[微信支付-支出]`
      );
    }
  ]
];

/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  let json = JSON.parse(data);
  if (json.ret_code !== 0 || json.ret_msg !== 'ok') {
    return null;
  }
  let shopName = json.header.nickname;
  let money = json.header.fee;
  let billType = BillType.Income;
  let billTypeName = '收入';
  if (money.includes('-')) {
    billType = BillType.Expend;
    billTypeName = '支出';
  }

  let obj = new RuleObject(billType);
  obj.shopName = shopName;
  obj.money = toFloat(money);
  obj.channel = `微信[账单-${billTypeName}]`;

  for (let item of json.preview) {
    if (item.label) {
      let label = item.label.name;
      let value = item.value[0].name;
      switch (label) {
        case '商品':
          obj.shopItem = value;
          break;
        case '商户全称':
          obj.shopName = value;
          break;
        case  '支付方式':
          obj.accountNameFrom = value;
          break;
        case '支付时间':
          obj.time = convertToNumber(value) * 1000;
          break;
      }
    }
  }

  return obj;

}
