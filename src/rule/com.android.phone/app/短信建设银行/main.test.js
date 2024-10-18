const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('建设银行信用卡支出', () =>
  testAnkio('建设银行信用卡支出', [
    {
      "type": "Expend",
      "money": 858,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '建设银行信用卡(1234)',
      "accountNameTo": '',
      "currency": 'JPY',
      "time": formatDate("10月02日23:00","M月D日h:i"),
      "channel": '建设银行信用卡[消费]',
    },
  ]));
