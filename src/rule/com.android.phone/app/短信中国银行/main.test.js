const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('中国银行信用卡支出', () =>
  testAnkio('中国银行信用卡支出', [
    {
      'type': 'Expend',
      'money': 138.2,
      'fee': 0,
      'shopName': '钱袋宝',
      'shopItem': '',
      'accountNameFrom': '中国银行信用卡(6666)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年10月05日', 'Y年M月D日'),
      'channel': '中国银行信用卡[消费]'
    }
  ]));

test('中国银行支出', () =>
  testAnkio('中国银行支出', [
    {
      'type': 'Expend',
      'money': 45,
      'fee': 0,
      'shopName': '黄胜辉',
      'shopItem': '网上支付',
      'accountNameFrom': '中国银行(1502)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-12-24 13:05:14', 'Y-M-D h:i:s'),
      'channel': '中国银行[支出]'
    },
    {
      'type': 'Expend',
      'money': 1,
      'fee': 0,
      'shopName': '网上支付',
      'shopItem': '支取',
      'accountNameFrom': '中国银行(6450)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月28日', 'M月D日'),
      'channel': '中国银行[支出]'
    },
    {
      'type': 'Expend',
      'money': 45,
      'fee': 0,
      'shopName': '网上支付',
      'shopItem': '支取',
      'accountNameFrom': '中国银行(6957)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月03日', 'M月D日'),
      'channel': '中国银行[支出]'
    }
  ]));
