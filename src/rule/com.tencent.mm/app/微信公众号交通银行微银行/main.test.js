const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('交通银行收入', () =>
  testAnkio('交通银行收入', [
    {
      "type": "Income",
      "money": 26028,
      "fee": 0,
      "shopName": '',
      "shopItem": '其他第三方交行转入',
      "accountNameFrom": '交通银行账户(3896)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-09-27 14:17', 'Y-M-D h:i'),
      "channel": '微信[交通银行微银行-收入]',
    },

  ]));

test('交通银行支出', () =>
  testAnkio('交通银行支出', [
    {
      "type": "Expend",
      "money": 22.6,
      "fee": 0,
      "shopName": '',
      "shopItem": '网络支付消费',
      "accountNameFrom": '交通银行账户(7237)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-09-25 11:03', 'Y-M-D h:i'),
      "channel": '微信[交通银行微银行-支出]',
    },
    {
      "type": "Expend",
      "money": 500,
      "fee": 0,
      "shopName": '',
      "shopItem": '支付平台快捷支付',
      "accountNameFrom": '交通银行账户(7237)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-10-09 08:31', 'Y-M-D h:i'),
      "channel": '微信[交通银行微银行-支出]',
    },
  ]));
