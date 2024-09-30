const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('中国农业银行收入', () =>
  testAnkio('中国农业银行收入', [
    {
      "type": "Income",
      "money": 12000,
      "fee": 0,
      "shopName": '',
      "shopItem": '公积金付',
      "accountNameFrom": '中国农业银行(6666)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("09月27日09时15分",'M月D日h时i分'),
      "channel": '中国农业银行[收入]',
    },
  ]));

