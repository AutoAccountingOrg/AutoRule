
const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('邮储银行信用卡消费', () =>
  testAnkio('邮储银行信用卡消费', [
    {
      'type': 'Expend',
      'money': 0.50,
      'fee': 0,
      'shopName': '微信支付（财付通）',
      'shopItem': '广州骑安',
      'accountNameFrom': '邮储银行信用卡(4269)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年11月28日 8:47:01', 'Y年M月D日 h:i:s'),
      'channel': '微信[邮储银行信用卡-支出]'
    }
  ]));

test('邮储银行信用卡还款', () =>
  testAnkio('邮储银行信用卡还款', [
    {
      'type': 'Income',
      'money': 3500.00,
      'fee': 0,
      'shopName': '邮储银行信用卡',
      'shopItem': '还款',
      'accountNameFrom': '邮储银行信用卡(4269)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年1月3日 7:24:16', 'Y年M月D日 h:i:s'),
      'channel': '微信[邮储银行信用卡-还款]'
    }
  ]));
