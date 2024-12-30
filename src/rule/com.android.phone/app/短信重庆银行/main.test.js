const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('重庆银行收入', () =>
  testAnkio('重庆银行收入', [
    {
      'type': 'Income',
      'money': 708,
      'fee': 0,
      'shopName': '',
      'shopItem': '12月份加班补贴转账存入',
      'accountNameFrom': '重庆银行(8863)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年12月18日', 'Y年M月D日'),
      'channel': '重庆银行[收入]'
    }
  ]));
