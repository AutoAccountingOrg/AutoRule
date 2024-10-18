const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('广东农信收入', () =>
  testAnkio('广东农信收入', [
    {
      "type": "Income",
      "money": 1000,
      "fee": 0,
      "shopName": '广东农信',
      "shopItem": '补助款',
      "accountNameFrom": '广东农信(0666)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("09月25日12:09","M月D日h:i"),
      "channel": '广东农信[收入]',
    },
  ]));

test('广东农信支出', () =>
  testAnkio('广东农信支出', [
    {
      "type": "Expend",
      "money": 5,
      "fee": 0,
      "shopName": '广东农信',
      "shopItem": '财付通支付',
      "accountNameFrom": '广东农信(0000)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("10月01日00:05","M月D日h:i"),
      "channel": '广东农信[支出]',
    },
  ]));
