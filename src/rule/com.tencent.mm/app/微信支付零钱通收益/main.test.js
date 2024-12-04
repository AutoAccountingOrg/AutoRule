const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信支付零钱通收益', () =>
  testAnkio('微信支付零钱通收益', [
    {
      "type": "Income",
      "money": 4.1,
      "fee": 0,
      "shopName": '零钱通',
      "shopItem": '当前累计收益￥127.24',
      "accountNameFrom": '零钱通',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1733110247109,
      "channel": '微信[微信支付-零钱通收益月报]',
    },
  ]));
