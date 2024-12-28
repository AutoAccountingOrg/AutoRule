const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('抖音月付消费通知', () =>
  testAnkio('抖音月付消费', [
    {
      'type': 'Expend',
      'money': 148,
      'fee': 0,
      'shopName': '',
      'shopItem': '抖音月付消费',
      'accountNameFrom': '抖音月付',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1732616124019,
      'channel': '抖音月付[消费]'
    }
  ]));
