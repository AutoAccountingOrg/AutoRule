const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('交通银行信用卡支出', () =>
  testAnkio('交通银行信用卡支出', [
    {
      'type': 'Expend',
      'money': 10,
      'fee': 0,
      'shopName': '',
      'shopItem': '消费',
      'accountNameFrom': '交通银行信用卡(9354)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年11月29日 11:03', 'Y年M月D日 h:i'),
      'channel': '微信[交通银行信用卡买单吧-支出]'
    },
    {
      'type': 'Expend',
      'money': 47,
      'fee': 0,
      'shopName': '',
      'shopItem': '消费',
      'accountNameFrom': '交通银行信用卡(7355)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年10月23日 12:05', 'Y年M月D日 h:i'),
      'channel': '微信[交通银行信用卡买单吧-支出]'
    },
    {
      'type': 'Expend',
      'money': 100,
      'fee': 0,
      'shopName': '',
      'shopItem': '刷卡金抵扣',
      'accountNameFrom': '交通银行信用卡(7355)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年11月16日 17:30', 'Y年M月D日 h:i'),
      'channel': '微信[交通银行信用卡买单吧-支出]'
    }
  ]));

