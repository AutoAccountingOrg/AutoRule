const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('广西北部湾银行收入', () =>
  testAnkio('广西北部湾银行收入', [
    {
      'type': 'Income',
      'money': 122,
      'fee': 0,
      'shopName': '转入',
      'shopItem': '重度残疾人护理补贴',
      'accountNameFrom': '广西北部湾银行(9820)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-12-25 18:00:18', 'Y-M-D h:i:s'),
      'channel': '微信[广西北部湾银行-收入]'
    }

  ]));
