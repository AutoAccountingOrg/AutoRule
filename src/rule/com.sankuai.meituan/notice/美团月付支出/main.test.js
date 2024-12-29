const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.sankuai.meituan');
test('美团月付支出', () =>
  testAnkio('美团月付支出', [
    {
      'type': 'Expend',
      'money': 126,
      'fee': 0,
      'shopName': '美团',
      'shopItem': '还款日每月8号，记得按时还款，查看额度变化>>',
      'accountNameFrom': '美团月付',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1729028895496,
      'channel': '美团月付[支出]'
    },
    {
      'type': 'Expend',
      'money': 17.23,
      'fee': 0,
      'shopName': '美团',
      'shopItem': '还款日每月8号，记得按时还款，查看订单详情>>',
      'accountNameFrom': '美团月付',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1728986881286,
      'channel': '美团月付[支出]'
    }
  ]));
