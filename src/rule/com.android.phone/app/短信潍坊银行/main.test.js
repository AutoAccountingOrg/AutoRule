
const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');

test('潍坊银行支出', () =>
  testAnkio('潍坊银行支出', [
    {
      'type': 'Expend',
      'money': 2000,
      'fee': 0,
      'shopName': '',
      'shopItem': '支取',
      'accountNameFrom': '潍坊银行(754)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('01月25日10:31', 'M月D日h:i'),
      'channel': '潍坊银行[支出]'
    },
    {
      'type': 'Expend',
      'money': 2000,
      'fee': 0,
      'shopName': '',
      'shopItem': '支取',
      'accountNameFrom': '潍坊银行(754)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('01月25日10:31', 'M月D日h:i'),
      'channel': '潍坊银行[支出]'
    }
  ]));

test('潍坊银行收入', () =>
  testAnkio('潍坊银行收入', [
    {
      'type': 'Income',
      'money': 1228.17,
      'fee': 0,
      'shopName': '',
      'shopItem': '存入（工资或奖金）',
      'accountNameFrom': '潍坊银行(754)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('01月25日09:24', 'M月D日h:i'),
      'channel': '潍坊银行[收入]'
    }
  ]));
