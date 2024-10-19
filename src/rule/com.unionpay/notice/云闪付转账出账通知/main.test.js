const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.unionpay');
test('云闪付转账出账', () =>
  testAnkio('云闪付转账出账', [
    {
      "type": "Expend",
      "money": 170,
      "fee": 0,
      "shopName": '陈阳',
      "shopItem": '',
      "accountNameFrom": '工商银行卡6212 **** **** 7432',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("2024-10-06 23:46","Y-M-D h:i"),
      "channel": '云闪付[转账]',
    },
  ]));


