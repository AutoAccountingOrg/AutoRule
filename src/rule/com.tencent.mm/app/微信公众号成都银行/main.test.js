const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('成都银行收入', () =>
  testAnkio('成都银行收入', [
    {
      'type': 'Income',
      'money': 0.01,
      'fee': 0,
      'shopName': '',
      'shopItem': '汇兑来账',
      'accountNameFrom': '成都银行(7606)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年11月17日 00:47:09', 'Y年M月D日 h:i:s'),
      'channel': '微信[成都银行-收入]'
    }

  ]));
