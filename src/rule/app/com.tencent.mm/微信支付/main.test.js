const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');
test('微信支付消费（商家收款）', () =>
  testAnkio('微信支付消费（商家收款）', [
    {
      type: 0,
      money: 14.0,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-付款]',
    },
  ]));

test('微信支付消费（第三方收款）', () =>
  testAnkio('微信支付消费（第三方收款）', [
    {
      type: 0,
      money: 2.0,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-付款]',
    },
    {
      type: 0,
      money: 6.2,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '零钱通',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-付款]',
    },
    {
      type: 0,
      money: 12.7,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-付款]',
    },
    {
      type: 0,
      money: 35.41,
      fee: 0,
      shopName: '京东',
      shopItem: '',
      accountNameFrom: '中国银行储蓄卡(7575)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-付款]',
    },
  ]));

test('微信支付自动扣费', () =>
  testAnkio('微信支付自动扣费', [
    {
      type: 0,
      money: 53.72,
      fee: 0,
      shopName: '滴滴出行',
      shopItem: '先乘后付',
      accountNameFrom: '零钱通',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-扣费]',
    },
    {
      type: 0,
      money: 51.7,
      fee: 0,
      shopName: '滴滴出行',
      shopItem: '先乘后付',
      accountNameFrom: '零钱通',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-扣费]',
    },
    {
      type: 0,
      money: 25,
      fee: 0,
      shopName: '深圳市迅雷网络技术有限公司',
      shopItem:
        '迅雷超级会员微信自动续费, 你的深圳市迅雷网络技术有限公司账号（185*****230）扣费成功。',
      accountNameFrom: '中国银行储蓄卡(7575)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-扣费]',
    },
    {
      type: 0,
      money: 18.5,
      fee: 0,
      shopName: '江苏联通',
      shopItem: '腾讯王卡微信话费代扣, 你的江苏联通账号（19999xxxx）扣费成功。',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-扣费]',
    },
    {
      type: 0,
      money: 19,
      fee: 0,
      shopName: '',
      shopItem: 'Keep会员包月自动续费, 你的Keep账号（太公摘花）扣费成功。',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-扣费]',
    },
  ]));

test('微信支付收款', () =>
  testAnkio('微信支付收款', [
    {
      type: 1,
      money: 0.02,
      fee: 0,
      shopName: '个人收款服务',
      shopItem: '热tree他 今日第2笔收款，共计￥0.03',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-收款]',
    },
    {
      type: 1,
      money: 0.01,
      fee: 0,
      shopName: '个人收款服务',
      shopItem: '今日第1笔收款，共计￥0.01',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-收款]',
    },
  ]));

test('微信支付转账过期退款', () =>
  testAnkio('微信支付转账过期退款', [
    {
      type: 1,
      money: 1000,
      fee: 0,
      shopName: '',
      shopItem: '微信支付未在24小时内接收你的转账',
      accountNameFrom: '中国银行（7575）',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('2024-04-14 13:02:31', 'Y-M-D h:i:s'),
      channel: '微信[微信支付-退款]',
    },

    {
      type: 1,
      money: 0.01,
      fee: 0,
      shopName: '',
      shopItem: '微信支付未在24小时内接收你的转账',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('2024-04-15 08:59:11', 'Y-M-D h:i:s'),
      channel: '微信[微信支付-退款]',
    },
    {
      type: 1,
      money: 0.01,
      fee: 0,
      shopName: '',
      shopItem: 'send未在24小时内接收你的转账',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('2024-04-17 20:17:16', 'Y-M-D h:i:s'),
      channel: '微信[微信支付-退款]',
    },
  ]));

test('微信支付收款（商家付款）', () =>
  testAnkio('微信支付收款（商家付款）', [
    {
      type: 1,
      money: 0.1,
      fee: 0,
      shopName: '宿迁兆盈商服科技有限公司',
      shopItem: '你收到一笔分销佣金',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-收款（商家）]',
    },
    {
      type: 1,
      money: 5,
      fee: 0,
      shopName: '兆纳科技',
      shopItem: '淘金城镇',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-收款（商家）]',
    },
    {
      type: 1,
      money: 1.2,
      fee: 0,
      shopName: '臻鼎',
      shopItem: '番茄小说提现',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-收款（商家）]',
    },
    {
      type: 1,
      money: 10,
      fee: 0,
      shopName: '元梦之星',
      shopItem: '元梦之星',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-收款（商家）]',
    },
  ]));
test('微信支付扫码付款', () =>
  testAnkio('微信支付扫码付款', [
    {
      type: 0,
      money: 10,
      fee: 0,
      shopName: '开心快乐每一天',
      shopItem: '付款给开心快乐每一天(**财)',
      accountNameFrom: '徽商银行储蓄卡',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-付款]',
    },
    {
      type: 0,
      money: 70,
      fee: 0,
      shopName: '酱骨头焖面',
      shopItem: '付款给酱骨头焖面(**强)',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-付款]',
    },
  ]));

test('微信支付收款入账', () =>
  testAnkio('微信支付收款入账', [
    {
      type: 1,
      money: 0.1,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-收款入账]',
    },
  ]));
test('微信支付零钱通定时转入', () =>
  testAnkio('微信支付零钱通定时转入', [
    {
      type: 2,
      money: 5000,
      fee: 0,
      shopName: '零钱通',
      shopItem: '累计转入¥22500.00',
      accountNameFrom: '宁波银行(7715)',
      accountNameTo: '零钱通',
      currency: 'CNY',
      time: formatDate(),
      channel: '微信[微信支付-零钱通定时转入]',
    },
  ]));
