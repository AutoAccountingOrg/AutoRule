const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('京东购物消费', () =>
  testAnkio('京东购物消费', [
    {
      "type": "Expend",
      "money": 25.2,
      "fee": 0,
      "shopName": '',
      "shopItem": '嘻嘻嘻嘻嘻嘻嘻下次..',
      "accountNameFrom": '',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate(),
      "channel": '微信[京东购物-消费]',
    },
    {
      "type": "Expend",
      "money": 23.9,
      "fee": 0,
      "shopName": '',
      "shopItem": '农夫山泉 饮用天然水 12L/桶',
      "accountNameFrom": '',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate(),
      "channel": '微信[京东购物-消费]',
    },
  ]));
