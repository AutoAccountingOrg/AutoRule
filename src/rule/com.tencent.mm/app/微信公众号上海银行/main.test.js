const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('上海银行收入', () =>
  testAnkio('上海银行收入', [
    {
      "type": "Income",
      "money": 216.86,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '上海银行(9517)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('11月14日 14:45', 'M月D日 h:i'),
      "channel": '微信[上海银行-转入]',
    },

  ]));
