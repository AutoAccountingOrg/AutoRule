const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('重庆公积金中心收入', () =>
  testAnkio('重庆公积金中心收入', [
    {
      'type': 'Income',
      'money': 1980,
      'fee': 0,
      'shopName': '',
      'shopItem': '汇缴',
      'accountNameFrom': '重庆公积金中心',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年12月13日', 'Y年M月D日'),
      'channel': '重庆公积金中心[收入]'
    }
  ]));
