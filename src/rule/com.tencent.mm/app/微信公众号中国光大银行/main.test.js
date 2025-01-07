const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('中国光大银行消费', () =>
  testAnkio('中国光大银行消费', [
    {
      'type': 'Expend',
      'money': 77.4,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '中国光大银行(7221)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年01月06日 10:53', 'Y年M月D日 h:i'),
      'channel': '微信[中国光大银行-支出]'
    }

  ]));
