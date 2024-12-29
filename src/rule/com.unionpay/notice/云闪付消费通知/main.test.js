const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.unionpay');
test('云闪付消费', () =>
  testAnkio('云闪付消费', [
    {
      'type': 'Expend',
      'money': 114.65,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '银行卡(7644)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('01日11时37分', 'D日h时i分'),
      'channel': '云闪付[支出]'
    }
  ]));


