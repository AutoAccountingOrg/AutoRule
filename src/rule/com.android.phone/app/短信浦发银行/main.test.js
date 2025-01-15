const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('浦发银行收入', () =>
  testAnkio('浦发银行收入', [
    {
      'type': 'Income',
      'money': 9915.48,
      'fee': 0,
      'shopName': '',
      'shopItem': '其他代发工资',
      'accountNameFrom': '浦发银行(4036)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('14:09', 'h:i'),
      'channel': '浦发银行[收入]'
    }
  ]));
