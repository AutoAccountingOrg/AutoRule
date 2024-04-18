const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

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
      time: 0,
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
      time: 0,
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
      time: 0,
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
      time: 0,
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
      time: 0,
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
      time: 0,
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
      time: 0,
      channel: '微信[微信支付-扣费]',
    },
    {
      type: 0,
      money: 25,
      fee: 0,
      shopName: '深圳市迅雷网络技术有限公司',
      shopItem: '迅雷超级会员微信自动续费',
      accountNameFrom: '中国银行储蓄卡(7575)',
      accountNameTo: '',
      currency: 'CNY',
      time: 0,
      channel: '微信[微信支付-扣费]',
    },
  ]));

test('微信支付收款', () =>
  testAnkio('微信支付收款', [
    {
      type: 1,
      money: 12.7,
      fee: 0,
      shopName: '',
      shopItem: '今日第1笔收款，共计￥12.70',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: 0,
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
      time: '2024-04-14 13:02:31',
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
      time: '2024-04-15 08:59:11',
      channel: '微信[微信支付-退款]',
    },
  ]));

test('微信支付收款（分销佣金）', () =>
  testAnkio('微信支付收款（分销佣金）', [
    {
      type: 1,
      money: 0.1,
      fee: 0,
      shopName: '宿迁兆盈商服科技有限公司',
      shopItem: '你收到一笔分销佣金',
      accountNameFrom: '零钱',
      accountNameTo: '',
      currency: 'CNY',
      time: 0,
      channel: '微信[微信支付-收款]',
    },
  ]));
