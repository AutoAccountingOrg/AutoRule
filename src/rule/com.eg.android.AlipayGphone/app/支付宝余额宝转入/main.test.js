const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝余额宝转入', () =>
  testAnkio('支付宝余额宝转入', [
    {
      'type': 'Transfer',
      'money': 10,
      'fee': 0,
      'shopName': '余额宝',
      'shopItem': '余额宝-单次转入',
      'accountNameFrom': '支付宝余额',
      'accountNameTo': '余额宝',
      'currency': 'CNY',
      'time': 1728206635000,
      'channel': '支付宝[余额宝-转入]'
    }
  ]));
