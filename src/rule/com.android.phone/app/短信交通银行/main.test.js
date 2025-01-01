const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('交通银行信用卡消费', () =>
  testAnkio('交通银行信用卡消费', [
    {
      'type': 'Expend',
      'money': 153,
      'fee': 0,
      'shopName': '',
      'shopItem': '信用卡消费',
      'accountNameFrom': '交通银行信用卡(0262)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('01日19时09分', 'D日h时i分'),
      'channel': '交通银行[消费]'
    }
  ]));
