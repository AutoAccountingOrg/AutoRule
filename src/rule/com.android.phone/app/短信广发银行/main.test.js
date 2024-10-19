const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('广发银行支出', () =>
  testAnkio('广发银行支出', [
    {
      "type": "Expend",
      "money": 40,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '广发银行(2498)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("10日09:27","D日h:i"),
      "channel": '广发银行[消费]',
    },
  ]));
