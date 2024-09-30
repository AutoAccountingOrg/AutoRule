const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('中国农业银行支出', () =>
  testAnkio('中国农业银行支出', [
    {
      "type": "Expend",
      "money": 0.1,
      "fee": 0,
      "shopName": '',
      "shopItem": '微信支付',
      "accountNameFrom": '中国农业银行借记卡(3878)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-09-19 07:55:58', 'Y-M-D h:i:s'),
      "channel": '微信[中国农业银行微银行-支出]',
    },
  ]));
