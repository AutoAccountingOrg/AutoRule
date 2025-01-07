const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微众银行App消费', () =>
  testAnkio('微众银行App消费', [
    {
      'type': 'Expend',
      'money': 20.00,
      'fee': 0,
      'shopName': '财付通（银联条码支付互联互通）',
      'shopItem': '',
      'accountNameFrom': '微众银行App(0000)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年01月06日 14:47', 'Y年M月D日 h:i'),
      'channel': '微信[微众银行App-消费]'
    }
  ]));
