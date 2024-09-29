const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝余额宝收益', () =>
  testAnkio('支付宝余额宝收益', [
    {
      "type": "Income",
      "money": 0.01,
      "fee": 0,
      "shopName": '余额宝',
      "shopItem": '昨日收益(04-15余额宝收益)',
      "accountNameFrom": '余额宝',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1713275758000,
      "channel": '支付宝[余额宝-收入]',
    },
  ]));



