const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信公众号ETC助手', () =>
  testAnkio('微信公众号ETC助手', [
    {
      'type': 'Expend',
      'money': 42.64,
      'fee': 0,
      'shopName': '陕FF93513',
      'shopItem': '陕西新街子收费站驶入-陕西略阳收费站驶出',
      'accountNameFrom': '',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-11-24 19:36:44', 'Y-M-D h:i:s'),
      'channel': '微信[ETC助手]'
    }

  ]));
