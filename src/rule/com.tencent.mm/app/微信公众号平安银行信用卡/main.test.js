const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('平安银行信用卡消费', () =>
  testAnkio('平安银行信用卡消费', [
    {
      'type': 'Expend',
      'money': 56.02,
      'fee': 5,
      'shopName': '',
      'shopItem': '信用卡5元刷卡金已使用',
      'accountNameFrom': '平安银行信用卡',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年04月30日 16:21', 'Y年M月D日 h:i'),
      'channel': '微信[平安银行信用卡-消费]'
    },
    {
      'type': 'Expend',
      'money': 15,
      'fee': 0,
      'shopName': '',
      'shopItem': '财付通-高新开发区创印图文制作中心',
      'accountNameFrom': '平安银行信用卡(7402)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年10月16日 11:08', 'Y年M月D日 h:i'),
      'channel': '微信[平安银行信用卡-消费]'
    }

  ]));

test('平安银行信用卡退款', () =>
  testAnkio('平安银行信用卡退款', [
    {
      'type': 'Income',
      'money': 184.9,
      'fee': 0,
      'shopName': '信用卡退款',
      'shopItem': '抵扣10月账单',
      'accountNameFrom': '平安银行信用卡',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('10月09日', 'M月D日'),
      'channel': '微信[平安银行信用卡-退款]'
    }
  ]));

test('平安银行信用卡还款', () =>
  testAnkio('平安银行信用卡还款', [
    {
      'type': 'Transfer',
      'money': 36614.17,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '',
      'accountNameTo': '平安银行信用卡',
      'currency': 'CNY',
      'time': formatDate('10月15日23:58', 'M月D日h:i'),
      'channel': '微信[平安银行信用卡-还款]'
    }
  ]));
