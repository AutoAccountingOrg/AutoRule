const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('上海农商银行支出', () =>
  testAnkio('上海农商银行支出', [
    {
      'type': 'Expend',
      'money': 1118,
      'fee': 0,
      'shopName': '',
      'shopItem': '汇款转出',
      'accountNameFrom': '上海农商银行(8162)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月6日10:39', 'M月D日h:i'),
      'channel': '上海农商银行[支出]'
    }
  ]));
