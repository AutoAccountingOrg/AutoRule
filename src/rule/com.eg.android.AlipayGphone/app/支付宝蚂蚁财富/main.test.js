const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝蚂蚁财富', () =>
  testAnkio('支付宝蚂蚁财富', [
    {
      'type': 'Expend',
      'money': 401.03,
      'fee': 0,
      'shopName': '蚂蚁财富',
      'shopItem': '2024-05-15总资产收益已更新',
      'accountNameFrom': '蚂蚁财富账户',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1715843879000,
      'channel': '支付宝[蚂蚁财富]'
    }
  ]));
