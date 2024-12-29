const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信支付转账退款', () =>
  testAnkio('微信支付转账退款', [
    {
      'type': 'Income',
      'money': 100,
      'fee': 0,
      'shopName': '微信退款',
      'shopItem': '兰陵喵喵解忧馆退还了你的转账',
      'accountNameFrom': '保定银行（7368）',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-05-18 14:54:12', 'Y-M-D h:i:s'),
      'channel': '微信[微信支付-转账退款]'
    }
  ]));

test('微信支付转账过期退款', () =>
  testAnkio('微信支付转账过期退款', [
    {
      'type': 'Income',
      'money': 1000,
      'fee': 0,
      'shopName': '微信退款',
      'shopItem': '微信支付未在24小时内接收你的转账',
      'accountNameFrom': '中国银行（7575）',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-04-14 13:02:31', 'Y-M-D h:i:s'),
      'channel': '微信[微信支付-转账过期退款]'
    },

    {
      'type': 'Income',
      'money': 0.01,
      'fee': 0,
      'shopName': '微信退款',
      'shopItem': '微信支付未在24小时内接收你的转账',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-04-15 08:59:11', 'Y-M-D h:i:s'),
      'channel': '微信[微信支付-转账过期退款]'
    }
  ]));
test('微信支付红包退款', () =>
  testAnkio('微信支付红包退款', [
    {
      'type': 'Income',
      'money': 0.01,
      'fee': 0,
      'shopName': '微信退款',
      'shopItem': '朋友"JHL"未在24小时内领取你发的红包',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-08-22 18:53:34', 'Y-M-D h:i:s'),
      'channel': '微信[微信支付-红包退款]'
    }

  ]));
