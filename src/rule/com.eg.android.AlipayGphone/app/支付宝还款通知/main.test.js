const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝还款通知', () =>
  testAnkio('支付宝还款通知', [
    {
      "type": "Transfer",
      "money": 722.59,
      "fee": 0,
      "shopName": '还款成功',
      "shopItem": '09月25日',
      "accountNameFrom": '工商银行储蓄卡(1862)',
      "accountNameTo": '借呗',
      "currency": 'CNY',
      "time": 1727222744000,
      "channel": '支付宝[还款成功]',
    },
    {
      "type": "Transfer",
      "money": 1795.68,
      "fee": 0,
      "shopName": '还款到账成功',
      "shopItem": '09月26日',
      "accountNameFrom": '招商银行储蓄卡(6598)',
      "accountNameTo": '江苏银行（6706）王麻子',
      "currency": 'CNY',
      "time": 1727324501000,
      "channel": '支付宝[还款成功]',
    },
  ]));
