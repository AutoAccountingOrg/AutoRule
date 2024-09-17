const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('京东白条还款', () =>
  testAnkio('京东白条还款', [
    {
      "type": "Expend",
      "money": 20.49,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '',
      "accountNameTo": '京东白条',
      "currency": 'CNY',
      "time": formatDate(`4月15日`, 'M月D日'),
      "channel": '微信[京东白条 还款]',
    },
  ]));

test('京东白条消费', () =>
  testAnkio('京东白条消费', [
    {
      "type": "Expend",
      "money": 23.75,
      "fee": 0,
      "shopName": '京东平台商户',
      "shopItem": '分3期',
      "accountNameFrom": '京东白条',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate(`04月28日 18:07:46`, 'M月D日 h:i:s'),
      "channel": '微信[京东白条 消费]',
    },
    {
      "type": "Expend",
      "money": 28.39,
      "fee": 0,
      "shopName": '京东平台商户',
      "shopItem": '不分期',
      "accountNameFrom": '京东白条',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate(`09月17日 05:04:45`, 'M月D日 h:i:s'),
      "channel": '微信[京东白条 消费]',
    },
  ]));
