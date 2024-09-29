const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('江苏银行信用卡还款', () =>
  testAnkio('江苏银行信用卡还款', [
    {
      "type": "Transfer",
      "money": 1795.68,
      "fee": 0,
      "shopName": '江苏银行信用卡',
      "shopItem": '上期账单已还清',
      "accountNameFrom": '',
      "accountNameTo": '江苏银行信用卡(6706)',
      "currency": 'CNY',
      "time": formatDate("09月26日","M月D日"),
      "channel": '江苏银行信用卡[还款]',
    },
  ]));
