const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

testAnkioInit(get, __dirname, DataType.App, 'com.eg.android.AlipayGphone');

test('支付宝红包', () =>
  testAnkio('支付宝红包', [
    {
      "type": 1,
      "money": 0.01,
      "fee": 0,
      "shopName": '来自从前慢',
      "shopItem": '普通红包',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1702972951000,
      "channel": '支付宝[收红包]',
    },
  ]));
