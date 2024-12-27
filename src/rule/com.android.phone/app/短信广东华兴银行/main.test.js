const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('广东华兴银行支出', () =>
  testAnkio('广东华兴银行支出', [
    {
      'type': 'Expend',
      'money': 428,
      'fee': 0,
      'shopName': '',
      'shopItem': '消费支出',
      'accountNameFrom': '广东华兴银行(8665)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年12月20日17:37', 'Y年M月D日h:i'),
      'channel': '广东华兴银行[支出]'
    }
  ]));

test('广东华兴银行收入', () =>
  testAnkio('广东华兴银行收入', [
    {
      'type': 'Income',
      'money': 16.99,
      'fee': 0,
      'shopName': '利息结息入账',
      'shopItem': '转账存入',
      'accountNameFrom': '广东华兴银行(8665)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月21日00:28', 'M月D日h:i'),
      'channel': '广东华兴银行[收入]'
    }
  ]));

