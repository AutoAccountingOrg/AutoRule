const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('美团消费', () =>
  testAnkio('美团消费', [
    {
      "type": 0,
      "money": 34.69,
      "fee": 0,
      "shopName": '美团',
      "shopItem": '185****6220',
      "accountNameFrom": '招商银行信用卡(1356)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年04月11日 18:05', 'Y年M月D日 h:i'),
      "channel": '微信[美团-消费]',
    },
    {
      "type": 0,
      "money": 19.68,
      "fee": 0,
      "shopName": '美团',
      "shopItem": '185****6210',
      "accountNameFrom": '招商银行信用卡(1356)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年04月12日 10:53', 'Y年M月D日 h:i'),
      "channel": '微信[美团-消费]',
    },
    {
      "type": 0,
      "money": 29,
      "fee": 0,
      "shopName": '美团',
      "shopItem": '133****6923',
      "accountNameFrom": '美团月付',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-04-12 15:29:46', 'Y-M-D h:i:s'),
      "channel": '微信[美团-消费]',
    },
  ]));
test('美团退款', () =>
  testAnkio('美团退款', [
    {
      "type": 1,
      "money": 52,
      "fee": 0,
      "shopName": '美团',
      "shopItem": '订单退款',
      "accountNameFrom": '招商银行信用卡(0898)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate(),
      "channel": '微信[美团-退款]',
    },
  ]));
