const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('中信银行消费', () =>
  testAnkio('中信银行消费', [
    {
      'type': 'Expend',
      'money': 11.86,
      'fee': 0,
      'shopName': '',
      'shopItem': '云闪付APP扫码-财付通(银联云闪付) ...',
      'accountNameFrom': '中信银行信用卡(9690)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('07月11日19:22', 'M月D日h:i'),
      'channel': '微信[中信银行信用卡-支出]'
    }
  ]));
