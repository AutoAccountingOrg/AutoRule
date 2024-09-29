const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');


testAnkioInit(get, __dirname, 'cmb.pb');
  test('招商银行转账', () =>
    testAnkio('招商银行转账', [
      {
        "type": 'Transfer',
        "money": 5650,
        "fee": 0,
        "shopName": '招行一卡通',
        "shopItem": '转账',
        "accountNameFrom": '招商银行(0877)',
        "accountNameTo": '',
        "currency": 'CNY',
        "time": 1711393810000,
        "channel": '招商银行[转账]'
      },
    ]));
