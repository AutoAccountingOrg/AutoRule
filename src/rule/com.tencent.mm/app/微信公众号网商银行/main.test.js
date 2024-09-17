const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('网商银行消费', () =>
  testAnkio('网商银行消费', [
    {
      "type": "Expend",
      "money": 30,
      "fee": 0,
      "shopName": '',
      "shopItem": '支付宝支付',
      "accountNameFrom": '网商银行',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-07-04 08:08:26', 'Y-M-D h:i:s'),
      "channel": '微信[网商银行-消费]',
    },

  ]));
