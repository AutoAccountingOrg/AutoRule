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
      "time": 1711393810000,
      "channel": '招商银行[入账]',
    },
    {
      "type": "Income",
      "money": 1245,
      "fee": 0,
      "shopName": '账户',
      "shopItem": '入账',
      "accountNameFrom": '招商银行(6598)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1729137578155,
      "channel": '招商银行[入账]',
    },
    {
      "type": "Income",
      "money": 8650,
      "fee": 0,
      "shopName": '',
      "shopItem": '入账',
      "accountNameFrom": '招商银行(6598)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1729659785984,
      "channel": '招商银行[收款]',
    },
  ]));
