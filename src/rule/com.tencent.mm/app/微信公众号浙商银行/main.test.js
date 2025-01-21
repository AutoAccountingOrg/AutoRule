const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('浙商银行信用卡消费', () =>
  testAnkio('浙商银行信用卡消费', [
    {
      'type': 'Expend',
      'money': 24.41,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '浙商银行(信用卡)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年01月21日 16:16', 'Y年M月D日 h:i'),
      'channel': '微信[浙商银行-支出]'
    }
  ]));
