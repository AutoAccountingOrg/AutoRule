const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝信用卡退款', () =>
  testAnkio('支付宝信用卡退款', [
    {
      "type": "Income",
      "money": 392.01,
      "fee": 0,
      "shopName": '拼多多支付-拼多多平台商户',
      "shopItem": '目前您个人消费卡账户可用额度为51277.33人民币',
      "accountNameFrom": '招商银行信用卡',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1727077315000,
      "channel": '支付宝[信用卡交易提醒]',
    },
  ]));
