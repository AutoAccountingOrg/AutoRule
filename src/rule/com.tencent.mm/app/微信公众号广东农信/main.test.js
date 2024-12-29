const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('广东农信收入', () =>
  testAnkio('广东农信收入', [
    {
      'type': 'Income',
      'money': 1000,
      'fee': 0,
      'shopName': '',
      'shopItem': '收入',
      'accountNameFrom': '广东农信(0666)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-09-25 12:09', 'Y-M-D h:i'),
      'channel': '微信[广东农信-收入]'
    }

  ]));
