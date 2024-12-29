const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝花呗自动还款', () =>
  testAnkio('支付宝花呗自动还款', [
    {
      'type': 'Transfer',
      'money': 964.11,
      'fee': 0,
      'shopName': '花呗还款日当天-还清',
      'shopItem': '本月花呗账单已还清',
      'accountNameFrom': '余额宝',
      'accountNameTo': '支付宝花呗',
      'currency': 'CNY',
      'time': 1728537400000,
      'channel': '支付宝[花呗-还款]'
    }
  ]));
