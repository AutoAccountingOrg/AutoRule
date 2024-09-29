const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');




test('支付宝余额宝红包', () =>
  testAnkio('支付宝余额宝红包', [
    {
      "type": "Income",
      "money": 0.01,
      "fee": 0,
      "shopName": '余额宝',
      "shopItem": '红包奖励发放',
      "accountNameFrom": '余额宝',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1727022713000,
      "channel": '支付宝[余额宝-红包]',
    },
  ]));
