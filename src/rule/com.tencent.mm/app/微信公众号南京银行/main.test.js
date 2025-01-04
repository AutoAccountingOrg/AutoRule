const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('南京银行借记卡支出', () =>
  testAnkio('南京银行借记卡支出', [
    {
      'type': 'Expend',
      'money': 2.00,
      'fee': 0,
      'shopName': '',
      'shopItem': '银联转账（云闪付）_xxx',
      'accountNameFrom': '南京银行(1234)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年01月03日 15:34:12', 'Y年M月D日 h:i:s'),
      'channel': '微信[南京银行-支出]'
    }
  ]));
