const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('饿了么本地生活消费', () =>
  testAnkio('饿了么本地生活消费', [
    {
      "type": "Expend",
      "money": 22.29,
      "fee": 0,
      "shopName": '饿了么本地生活',
      "shopItem": '',
      "accountNameFrom": '',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-05-11 18:54:48', 'Y-M-D h:i:s'),
      "channel": '微信[饿了么本地生活-消费]',
    },
  ]));
