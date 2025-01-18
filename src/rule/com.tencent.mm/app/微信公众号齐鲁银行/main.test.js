const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('齐鲁银行转账支出', () =>
  testAnkio('齐鲁银行转账支出', [
    {
      'type': 'Expend',
      'money': 10.00,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '齐鲁银行(6223****1925)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年01月18日 11:07:51', 'Y年M月D日 h:i:s'),
      'channel': '微信[齐鲁银行-支出]'
    }
  ]));
