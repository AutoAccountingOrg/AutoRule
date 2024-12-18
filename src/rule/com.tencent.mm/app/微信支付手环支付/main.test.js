const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信支付手环支付', () =>
  testAnkio('微信支付手环支付', [
    {
      "type": "Expend",
      "money": 13,
      "fee": 0,
      "shopName": '华侨大学',
      "shopItem": 'SIOS|124|31',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1729674936316,
      "channel": '微信[微信支付-手环支付]',
    },
  ]));
