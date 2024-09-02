const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');
test('京东白条还款', () =>
  testAnkio('京东白条还款', [
    {
      "type": 0,
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
      "type": 0,
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
  ]));
