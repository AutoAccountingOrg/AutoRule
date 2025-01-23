const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.android.phone');

test('建设银行信用卡支出', () =>
  testAnkio('建设银行信用卡支出', [
    {
      'type': 'Expend',
      'money': 858,
      'fee': 0,
      'shopName': '',
      'shopItem': '消费/预付款',
      'accountNameFrom': '建设银行信用卡(1234)',
      'accountNameTo': '',
      'currency': 'JPY',
      'time': formatDate('10月02日23:00', 'M月D日h:i'),
      'channel': '建设银行信用卡[消费]'
    },
    {
      'type': 'Expend',
      'money': 14.93,
      'fee': 0,
      'shopName': '',
      'shopItem': '消费（美团支付-美团支…）',
      'accountNameFrom': '建设银行信用卡(5082)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('10月09日11:18', 'M月D日h:i'),
      'channel': '建设银行信用卡[消费]'
    }
  ]));

test('建设银行信用卡退货', () =>
  testAnkio('建设银行信用卡退货', [
    {
      'type': 'Income',
      'money': 207.51,
      'fee': 0,
      'shopName': '',
      'shopItem': '消费退货/退税（支付宝-支付宝-…）',
      'accountNameFrom': '建设银行信用卡(1018)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('10月08日', 'M月D日'),
      'channel': '建设银行信用卡[退款]'
    }
  ]));

test('建设银行信用卡还款', () =>
  testAnkio('建设银行信用卡还款', [
    {
      'type': 'Transfer',
      'money': 97.00,
      'fee': 0,
      'shopName': '',
      'shopItem': '信用卡还款',
      'accountNameFrom': '约定还款账户',
      'accountNameTo': '建设银行信用卡(5083)',
      'currency': 'CNY',
      'time': formatDate('12月04日', 'M月D日'),
      'channel': '建设银行信用卡[还款]'
    }
  ]));

test('建设银行支出', () =>
  testAnkio('建设银行支出', [
    {
      'type': 'Expend',
      'money': 30,
      'fee': 0,
      'shopName': '',
      'shopItem': '账户1546包年短信服务费',
      'accountNameFrom': '建设银行(1546)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1734739538228,
      'channel': '建设银行[支出]'
    },
    {
      'type': 'Expend',
      'money': 24.15,
      'fee': 0,
      'shopName': '美团支付',
      'shopItem': '美团App老山东招牌炒鸡*',
      'accountNameFrom': '建设银行(4867)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1737426473689,
      'channel': '建设银行[支出]'
    }
  ]));
