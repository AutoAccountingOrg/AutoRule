const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('饿了么本地生活消费', () =>
  testAnkio('饿了么本地生活消费', [
    {
      "type": 0,
      "money": 22.29,
      "fee": 0,
      "shopName": '饿了么',
      "shopItem": '',
      "accountNameFrom": '',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-05-11 18:54:48', 'Y-M-D h:i:s'),
      "channel": '微信[饿了么本地生活-消费]',
    },
  ]));
