const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('兴业银行支出', () =>
  testAnkio('兴业银行支出', [
    {
      'type': 'Expend',
      'money': 5192,
      'fee': 0,
      'shopName': '',
      'shopItem': '跨行消费支出',
      'accountNameFrom': '兴业银行借记卡(4715)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年09月22日  20:40', 'Y年M月D日  h:i'),
      'channel': '微信[兴业银行-支出]'
    }
  ]));
