const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝蚂蚁森林光伏治沙现金奖励', () =>
  testAnkio('支付宝蚂蚁森林光伏治沙现金奖励', [
    {
      'type': 'Income',
      'money': 0.01,
      'fee': 0,
      'shopName': '蚂蚁森林',
      'shopItem': '光伏治沙现金奖励提醒',
      'accountNameFrom': '支付宝余额',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1732421666000,
      'channel': '支付宝[蚂蚁森林-收入]'
    }
  ]));
