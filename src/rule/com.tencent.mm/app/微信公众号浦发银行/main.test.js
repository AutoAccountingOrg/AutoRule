
const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('浦发银行消费', () =>
  testAnkio('浦发银行消费', [
    {
      'type': 'Expend',
      'money': 19.8,
      'fee': 0,
      'shopItem': '美团支付',
      'shopName': '网上支付',
      'accountNameFrom': '浦发银行(4113)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('10月09日 10:56:54', 'M月D日 h:i:s'),
      'channel': '微信[浦发银行-交易]'
    },
    {
      'type': 'Expend',
      'money': 5.0,
      'fee': 0,
      'shopName': '网上支付',
      'shopItem': '翼支付',
      'accountNameFrom': '浦发银行(1234)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月16日 08:21:39', 'M月D日 h:i:s'),
      'channel': '微信[浦发银行-交易]'
    }
  ]));

test('浦发银行收入', () =>
  testAnkio('浦发银行收入', [
    {
      'type': 'Income',
      'money': 68.0,
      'fee': 0,
      'shopName': '',
      'shopItem': '其他代发工资',
      'accountNameFrom': '浦发银行(4528)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('01月10日 19:42:21', 'M月D日 h:i:s'),
      'channel': '微信[浦发银行-交易]'
    }
  ]));
