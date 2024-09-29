const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');


testAnkioInit(get, __dirname, 'cmb.pb');
test('招商银行信用卡消费', () =>
  testAnkio('招商银行信用卡消费', [
    {
      "type": "Expend",
      "money": 6225.34,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '招商银行信用卡(1356)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1711393810000,
      "channel": '招商银行[信用卡消费]',
    },
  ]));
