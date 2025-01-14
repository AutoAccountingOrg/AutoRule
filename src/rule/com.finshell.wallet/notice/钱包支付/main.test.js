const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.sankuai.meituan');
test('钱包支付', () =>
  testAnkio('钱包支付', [
    {
      'type': 'Expend',
      'money': 1.8,
      'fee': 0,
      'shopName': '钱包支付',
      'shopItem': '本次消费：1.80 元',
      'accountNameFrom': 'OPPO/一加钱包',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1736510945851,
      'channel': 'OPPO/一加钱包[支出]'
    }
  ]));
