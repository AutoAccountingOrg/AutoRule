const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('湖南农信信用卡消费', () =>
  testAnkio('湖南农信信用卡消费', [
    {
      'type': 'Expend',
      'money': 120,
      'fee': 0,
      'shopName': '',
      'shopItem': '消费',
      'accountNameFrom': '湖南农信(0000)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月30日', 'M月D日'),
      'channel': '湖南农信[消费]'
    }
  ]));
