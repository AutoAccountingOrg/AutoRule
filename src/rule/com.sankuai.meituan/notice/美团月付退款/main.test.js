const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.sankuai.meituan');
test('美团月付退款', () =>
  testAnkio('美团月付退款', [
    {
      'type': 'Income',
      'money': 64.89,
      'fee': 0,
      'shopName': '美团',
      'shopItem': '一家东北烤肉2人餐',
      'accountNameFrom': '美团月付',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1729028895496,
      'channel': '美团月付[退款]'
    }
  ]));
