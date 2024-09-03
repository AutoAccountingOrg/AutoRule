const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

testAnkioInit(get, __dirname, DataType.App, 'com.eg.android.AlipayGphone');


test('支付宝网商银行转出', () =>
  testAnkio('支付宝网商银行转出', [
    {
      "type": 2,
      "money": 20000,
      "fee": 0,
      "shopName": '网商银行',
      "shopItem": '转账-转给江大',
      "accountNameFrom": '网商银行(9370)',
      "accountNameTo": '工商银行(8464)',
      "currency": 'CNY',
      "time": 1712916392000,
      "channel": '支付宝[网商银行-支出]',
    },

  ]));
