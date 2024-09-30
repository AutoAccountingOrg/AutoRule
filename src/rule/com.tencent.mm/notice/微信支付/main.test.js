const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');


testAnkioInit(get, __dirname, 'cmb.pb');
test('微信支付', () =>
  testAnkio('微信支付', [
    {
      "type": "Expend",
      "money": 14.99,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '微信支付',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信通知-消费]',
    },
  ]));
