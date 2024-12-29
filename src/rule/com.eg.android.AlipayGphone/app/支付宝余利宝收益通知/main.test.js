const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝余利宝收益', () =>
  testAnkio('支付宝余利宝收益', [
    {
      'type': 'Income',
      'money': 9.49,
      'fee': 0,
      'shopName': '余利宝',
      'shopItem': '昨日收益(04-08)',
      'accountNameFrom': '余利宝',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1712638021000,
      'channel': '支付宝[余利宝-收入]'
    },
    {
      'type': 'Income',
      'money': 0.41,
      'fee': 0,
      'shopName': '余利宝',
      'shopItem': '昨日收益(09-25 余利宝收益到账)',
      'accountNameFrom': '余利宝',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1727323012000,
      'channel': '支付宝[余利宝-收入]'
    }
  ]));

