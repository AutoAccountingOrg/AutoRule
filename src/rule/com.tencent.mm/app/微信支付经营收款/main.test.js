const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信支付经营收款', () =>
  testAnkio('微信支付经营收款', [
    {
      "type": "Income",
      "money": 1500,
      "fee": 0,
      "shopName": 'jyf',
      "shopItem": '收款成功，已存入经营账户',
      "accountNameFrom": '微信经营账户',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-经营收款]',
    },
  ]));
