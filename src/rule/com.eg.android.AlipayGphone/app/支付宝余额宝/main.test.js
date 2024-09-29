const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');



test('支付宝余额宝自动转入', () =>
  testAnkio('支付宝余额宝自动转入', [
    {
      "type": "Transfer",
      "money": 0.01,
      "fee": 0,
      "shopName": '余额宝',
      "shopItem": '转账收款到余额宝',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '余额宝',
      "currency": 'CNY',
      "time": 1710075625000,
      "channel": '支付宝[余额宝-转入]',
    },
  ]));

