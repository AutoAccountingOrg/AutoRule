const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝亲情卡消费', () =>
  testAnkio('支付宝亲情卡支付', [
    {
      "type": "Expend",
      "money": 55,
      "fee": 0,
      "shopName": '173******86(未实名)',
      "shopItem": '付款成功',
      "accountNameFrom": '北京银行信用购(原花呗)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1712723745000,
      "channel": '支付宝[亲情卡-消费]',
    },
  ]));
