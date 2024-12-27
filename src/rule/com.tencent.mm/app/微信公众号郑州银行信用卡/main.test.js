const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('郑州银行信用卡消费', () =>
  testAnkio('郑州银行信用卡消费', [
    {
      'type': 'Expend',
      'money': 5.24,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '郑州银行信用卡(2328)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年12月24日09时09分', 'Y年M月D日h时i分'),
      'channel': '微信[郑州银行信用卡-支出]'
    }
  ]));
