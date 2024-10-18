const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('邮储银行支出', () =>
  testAnkio('邮储银行支出', [
    {
      "type": "Expend",
      "money": 680,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '邮储银行(097)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("2024年10月09日15:54","Y年M月D日h:i"),
      "channel": '邮储银行[消费]',
    },
  ]));
