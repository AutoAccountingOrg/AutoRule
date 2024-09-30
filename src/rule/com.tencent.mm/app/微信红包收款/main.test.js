const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('收红包', () =>
  testAnkio('收红包', [
    {
      "type": "Income",
      "money": 2,
      "fee": 0,
      "shopName": '老爷',
      "shopItem": '恭喜发财，大吉大利',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1727426659000,
      "channel": '微信[微信支付-红包收款]',
    },
  ]));
