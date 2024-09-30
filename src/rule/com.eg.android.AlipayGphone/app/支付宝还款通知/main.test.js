const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝还款通知', () =>
  testAnkio('支付宝还款通知', [
    {
      "type": "Transfer",
      "money": 722.59,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '工商银行储蓄卡(1862)',
      "accountNameTo": '借呗',
      "currency": 'CNY',
      "time": 1727222744000,
      "channel": '支付宝[还款成功]',
    },
  ]));
