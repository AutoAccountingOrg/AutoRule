const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('浦发银行消费', () =>
  testAnkio('浦发银行消费', [
    {
      "type": "Expend",
      "money": 19.8,
      "fee": 0,
      "shopName": '',
      "shopItem": '浦发银行竭诚为您服务！',
      "accountNameFrom": '浦发银行(4113)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('10月09日 10:56:54', 'M月D日 h:i:s'),
      "channel": '微信[浦发银行-交易]',
    },
  ]));
