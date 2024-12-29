const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('四川农信收入', () =>
  testAnkio('四川农信收入', [
    {
      'type': 'Income',
      'money': 11.02,
      'fee': 0,
      'shopName': '合众易宝委托付款',
      'shopItem': '提现',
      'accountNameFrom': '四川农信',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-05-12 17:51', 'Y-M-D h:i'),
      'channel': '微信[四川农信-收入]'
    },
    {
      'type': 'Income',
      'money': 4285.71,
      'fee': 0,
      'shopName': '',
      'shopItem': '工资(收入)',
      'accountNameFrom': '四川农信',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-12-16 19:58', 'Y-M-D h:i'),
      'channel': '微信[四川农信-收入]'
    }
  ]));
