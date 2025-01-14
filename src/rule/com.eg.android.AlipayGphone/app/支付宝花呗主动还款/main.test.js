const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝花呗主动还款', () =>
  testAnkio('支付宝花呗主动还款', [
    {
      'type': 'Transfer',
      'money': 705.61,
      'fee': 0,
      'shopName': '花呗',
      'shopItem': '本月花呗账单已还清',
      'accountNameFrom': '银行卡',
      'accountNameTo': '花呗',
      'currency': 'CNY',
      'time': 1736232648000,
      'channel': '支付宝[花呗主动还款]'
    }
  ]));
