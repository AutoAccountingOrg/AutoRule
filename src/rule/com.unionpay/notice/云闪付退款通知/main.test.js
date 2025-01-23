const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.unionpay');
test('云闪付退款', () =>
  testAnkio('云闪付退款', [
    {
      'type': 'Income',
      'money': 203.36,
      'fee': 0,
      'shopName': '云闪付',
      'shopItem': '退款',
      'accountNameFrom': '银行卡尾号6048',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1737285022635,
      'channel': '云闪付[退款]'
    }
  ]));
