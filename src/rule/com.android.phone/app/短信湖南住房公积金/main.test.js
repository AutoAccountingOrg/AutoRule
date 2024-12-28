const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('湖南住房公积金收入', () =>
  testAnkio('湖南住房公积金收入', [
    {
      'type': 'Income',
      'money': 1316,
      'fee': 0,
      'shopName': '',
      'shopItem': '公积金缴存',
      'accountNameFrom': '湖南住房公积金[省直]',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年11月29日', 'Y年M月D日'),
      'channel': '湖南住房公积金[收入]'
    }
  ]));
