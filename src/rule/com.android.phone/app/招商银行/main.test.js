const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('招商银行信用卡还款', () =>
  testAnkio('招商银行信用卡还款', [
    {
      "type": "Transfer",
      "money": 322261.6,
      "fee": 0,
      "shopName": '收拾收拾',
      "shopItem": '信用卡还款',
      "accountNameFrom": '招商银行(6598)',
      "accountNameTo": '招商银行信用卡(1356)',
      "currency": 'CNY',
      "time": formatDate("09月26日12:20","M月D日h:i"),
      "channel": '招商银行[还款]',
    },
  ]));
