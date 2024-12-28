const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('江西辖内农商银行微银行转入', () =>
  testAnkio('江西辖内农商银行微银行转入', [
    {
      'type': 'Income',
      'money': 1858.37,
      'fee': 0,
      'shopItem': '宜春市袁州...',
      'shopName': '2024年12月921004宜春市袁州区慈化镇-转入',
      'accountNameFrom': '江西辖内农商银行微银行(0038)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年12月16日 13:39:59', 'Y年M月D日 h:i:s'),
      'channel': '微信[江西辖内农商银行微银行-收入]'
    }
  ]));
