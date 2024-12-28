const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝花呗支付', () =>
  testAnkio('支付宝花呗支付', [
    {
      'type': 'Expend',
      'money': 43.73,
      'fee': 0,
      'shopName': '支付宝',
      'shopItem': '你有一笔43.73元的支出，点击领取4个支付宝积分。使用花呗支付，请及时还款。',
      'accountNameFrom': '支付宝花呗',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1734576048462,
      'channel': '支付宝花呗[支出]'
    }
  ]));
