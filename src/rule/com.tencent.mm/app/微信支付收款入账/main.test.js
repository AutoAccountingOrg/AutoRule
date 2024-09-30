const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信支付收款入账', () =>
  testAnkio('微信支付收款入账', [
    {
      "type": "Income",
      "money": 0.1,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-收款入账]',
    },
  ]));
