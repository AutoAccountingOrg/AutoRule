const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('中国银行信用卡还款', () =>
  testAnkio('中国银行信用卡还款', [
    {
      'type': 'Expend',
      'money': 150,
      'fee': 0,
      'shopName': '购汇还款',
      'shopItem': '购汇转入',
      'accountNameFrom': '中国银行信用卡',
      'accountNameTo': '',
      'currency': 'USD',
      'time': formatDate('2024年10月15日', 'Y年M月D日'),
      'channel': '微信[中国银行信用卡-支出]'
    }
  ]));

test('中国银行信用卡消费', () =>
  testAnkio('中国银行信用卡消费', [
    {
      'type': 'Expend',
      'money': 14.16,
      'fee': 0,
      'shopName': '消费-钱袋宝支付',
      'shopItem': '',
      'accountNameFrom': '中国银行信用卡',
      'accountNameTo': '',
      'currency': 'RMB',
      'time': formatDate('10月11日 11:30', 'M月D日 h:i'),
      'channel': '微信[中国银行信用卡-支出]'
    }
  ]));

