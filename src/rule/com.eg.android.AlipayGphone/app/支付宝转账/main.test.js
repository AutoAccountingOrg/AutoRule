const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

testAnkioInit(get, __dirname, DataType.App, 'com.eg.android.AlipayGphone');

test('支付宝转账收款', () =>
  testAnkio('支付宝转账收款', [
    {
      "type": 1,
      "money": 0.01,
      "fee": 0,
      "shopName": '从前慢 185******30',
      "shopItem": '收到一笔转账',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1697209372000,
      "channel": '支付宝[转账-收入]',
    },
  ]));
