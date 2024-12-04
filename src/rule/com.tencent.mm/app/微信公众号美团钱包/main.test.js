const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('美团钱包消费', () =>
  testAnkio('美团钱包消费', [
    {
      "type": "Expend",
      "money": 79.87,
      "fee": 0,
      "shopName": '美团',
      "shopItem": '2412032204388043010906918154',
      "accountNameFrom": '美团月付',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-12-03 22:04:38', 'Y-M-D h:i:s'),
      "channel": '微信[美团钱包-消费]',
    },
  ]));
