const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('重庆银行行内转账支取', () =>
  testAnkio('重庆银行行内转账支取', [
    {
      'type': 'Expend',
      'money': 3,
      'fee': 0,
      'shopName': '',
      'shopItem': '行内转账支取（非支票）',
      'accountNameFrom': '重庆银行微银行(6230***********8863)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年01月01日 11:53:05', 'Y年M月D日 h:i:s'),
      'channel': '微信[重庆银行微银行-支出]'
    }
  ]));
