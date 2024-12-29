const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信支付收款', () =>
  testAnkio('微信支付收款', [
    {
      'type': 'Income',
      'money': 0.02,
      'fee': 0,
      'shopName': '热tree他',
      'shopItem': '今日第2笔收款，共计￥0.03',
      'accountNameFrom': '微信零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-二维码收款]'
    },
    {
      'type': 'Income',
      'money': 0.01,
      'fee': 0,
      'shopName': '个人收款服务',
      'shopItem': '今日第1笔收款，共计￥0.01',
      'accountNameFrom': '微信零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-二维码收款]'
    },
    {
      'type': 'Income',
      'money': 10,
      'fee': 0,
      'shopName': '',
      'shopItem': '今日第1笔收款，共计￥10.00',
      'accountNameFrom': '微信零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-二维码收款]'
    }
  ]));
