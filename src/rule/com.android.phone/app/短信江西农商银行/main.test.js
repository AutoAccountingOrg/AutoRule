const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('江西农商银行收入', () =>
  testAnkio('江西农商银行收入', [
    {
      "type": "Income",
      "money": 500,
      "fee": 0,
      "shopName": '张三',
      "shopItem": '',
      "accountNameFrom": '江西农商银行(6666)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("13日09时58分",'D日h时i分'),
      "channel": '江西农商银行[收入]',
    },
  ]));

