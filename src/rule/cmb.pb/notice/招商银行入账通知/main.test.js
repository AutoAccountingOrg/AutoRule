const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');


testAnkioInit(get, __dirname, 'cmb.pb');
test('招商银行入账', () =>
  testAnkio('招商银行入账', [
    {
      "type": "Income",
      "money": 1442,
      "fee": 0,
      "shopName": '招行一卡通',
      "shopItem": '入账',
      "accountNameFrom": '招商银行(6598)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate(),
      "channel": '招商银行[入账]',
    },
  ]));
