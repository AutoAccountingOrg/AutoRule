const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('泉州公积金中心收入', () =>
  testAnkio('泉州公积金中心收入', [
    {
      "type": "Income",
      "money": 2186,
      "fee": 0,
      "shopName": '*辉',
      "shopItem": '余额：12611.76',
      "accountNameFrom": '泉州公积金中心(6864)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1730341259074,
      "channel": '泉州公积金中心[收入]',
    },
  ]));


