const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('Ada服务消息到账通知', () =>
  testAnkio('Ada服务消息到账通知', [
    {
      'type': 'Income',
      'money': 49.85,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-12-11 18:18:29', 'Y-M-D h:i:s'),
      'channel': '微信[Ada服务消息-到账]'
    }
  ]));
