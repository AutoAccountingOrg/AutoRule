const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('北京银行支出', () =>
  testAnkio('北京银行支出', [
    {
      "type": "Expend",
      "money": 1,
      "fee": 0,
      "shopName": '微信红包',
      "shopItem": '财付通',
      "accountNameFrom": '北京银行(0561)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1730869418140,
      "channel": '北京银行[支出]',
    },
  ]));


