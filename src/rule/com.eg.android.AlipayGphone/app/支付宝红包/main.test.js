const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝收红包', () =>
  testAnkio('支付宝收红包', [
    {
      'type': 'Income',
      'money': 0.01,
      'fee': 0,
      'shopName': '来自从前慢',
      'shopItem': '普通红包',
      'accountNameFrom': '支付宝余额',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1702972951000,
      'channel': '支付宝[红包-收入]'
    }
  ]));
