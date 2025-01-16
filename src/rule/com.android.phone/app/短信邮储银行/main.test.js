
const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('邮储银行支出', () =>
  testAnkio('邮储银行支出', [
    {
      'type': 'Expend',
      'money': 680,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '邮储银行(097)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年10月09日15:54', 'Y年M月D日h:i'),
      'channel': '邮储银行[消费]'
    },
    {
      'type': 'Expend',
      'money': 1,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '邮储银行(800)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年01月16日16:50', 'Y年M月D日h:i'),
      'channel': '邮储银行[消费]'
    }

  ]));
test('邮储银行圈存', () =>
  testAnkio('邮储银行圈存', [
    {
      'type': 'Transfer',
      'money': 100,
      'fee': 0,
      'shopName': '巢湖学院',
      'shopItem': '校园卡圈存',
      'accountNameFrom': '邮储银行(1707)',
      'accountNameTo': '巢湖学院(校园卡)',
      'currency': 'CNY',
      'time': formatDate('11月18日11:48', 'M月D日h:i'),
      'channel': '邮储银行[圈存]'
    }

  ]));

