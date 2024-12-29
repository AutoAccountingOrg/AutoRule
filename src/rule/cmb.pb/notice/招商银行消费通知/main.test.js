const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'cmb.pb');
test('招商银行消费', () =>
  testAnkio('招商银行消费', [
    {
      'type': 'Transfer',
      'money': 2500,
      'fee': 0,
      'shopName': '财付通-理财通',
      'shopItem': '腾安基金销售（深圳）有限公司',
      'accountNameFrom': '招商银行(6598)',
      'accountNameTo': '腾讯理财通账户',
      'currency': 'CNY',
      'time': formatDate('09月19日08:46', 'M月D日h:i'),
      'channel': '招商银行[消费]'
    },
    {
      'type': 'Expend',
      'money': 19.7,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '招商银行(4809)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1728781111538,
      'channel': '招商银行[支出]'
    }
  ]));
