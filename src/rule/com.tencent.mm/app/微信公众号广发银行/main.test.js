const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('广发借记卡转账', () =>
  testAnkio('广发借记卡转账', [
    {
      'type': 'Expend',
      'money': 40,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '广发银行(5005)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('10月16日00:12', 'M月D日h:i'),
      'channel': '微信[广发银行-支出]'
    }
  ]));
