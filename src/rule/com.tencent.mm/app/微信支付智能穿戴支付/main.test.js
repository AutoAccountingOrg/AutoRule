const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信支付智能穿戴支付', () =>
  testAnkio('微信支付智能穿戴支付', [
    {
      'type': 'Expend',
      'money': 13,
      'fee': 0,
      'shopName': '华侨大学',
      'shopItem': 'SIOS|124|31',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1729674936316,
      'channel': '微信[微信支付-手环支付]'
    },
    {
      'type': 'Expend',
      'money': 9,
      'fee': 0,
      'shopName': '南京林业大学',
      'shopItem': '消费',
      'accountNameFrom': '零钱通',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1731846111012,
      'channel': '微信[微信支付-手环支付]'
    }
  ]));
