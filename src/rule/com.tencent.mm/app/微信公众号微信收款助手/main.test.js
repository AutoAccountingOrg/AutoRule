const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('提现到账', () =>
  testAnkio('提现到账', [
    {
      "type": "Transfer",
      "money": 7.0,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '微信经营账户',
      "accountNameTo": '四川农信(1586)',
      "currency": 'CNY',
      "time": formatDate("2024-05-31 08:23:27","Y-M-D h:i:s"),
      "channel": '微信[微信收款助手-提现]',
    },
  ]));
