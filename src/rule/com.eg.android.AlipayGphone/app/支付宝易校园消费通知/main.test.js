const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝易校园消费', () =>
  testAnkio('支付宝易校园消费', [
    {
      'type': 'Expend',
      'money': 13.00,
      'fee': 0,
      'shopName': '易校园',
      'shopItem': '校园卡支付',
      'accountNameFrom': '支付宝（易校园）',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1734425009000,
      'channel': '支付宝[易校园-支出]'
    }
  ]));
