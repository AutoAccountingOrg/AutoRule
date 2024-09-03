const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('保定银行支出', () =>
  testAnkio('保定银行支出', [
    {
      "type": 0,
      "money": 100,
      "fee": 0,
      "shopName": '',
      "shopItem": '财付通支付',
      "accountNameFrom": '保定银行直隶卡(7368)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-05-18 10:32', 'Y-M-D h:i'),
      "channel": '微信[保定银行-支出]',
    },
    {
      "type": 0,
      "money": 357,
      "fee": 0,
      "shopName": '',
      "shopItem": '消费',
      "accountNameFrom": '保定银行直隶卡(7368)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-05-16 11:05', 'Y-M-D h:i'),
      "channel": '微信[保定银行-支出]',
    },
  ]));
