const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

testAnkioInit(get, __dirname, DataType.App, 'com.eg.android.AlipayGphone');
test('支付宝余利宝收益', () =>
  testAnkio('支付宝余利宝收益', [
    {
      "type": 1,
      "money": 9.49,
      "fee": 0,
      "shopName": '余利宝',
      "shopItem": '昨日收益(04-08)',
      "accountNameFrom": '余利宝',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1712638021000,
      "channel": '支付宝[余利宝-收入]',
    },
  ]));

