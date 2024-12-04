const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信群收款付款', () =>
  testAnkio('微信群收款付款', [
    {
      "type": "Expend",
      "money": 82.2,
      "fee": 0,
      "shopName": '小王',
      "shopItem": '微信群收款',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1733056373047,
      "channel": '微信[群收款付款]',
    },
  ]));
