const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝商家转账', () =>
  testAnkio('支付宝商家转账', [
    {
      'type': 'Income',
      'money': 0.01,
      'fee': 0,
      'shopName': '葫芦星球支付宝红包',
      'shopItem': '收到一笔转账',
      'accountNameFrom': '支付宝余额',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1736903432000,
      'channel': '支付宝[转账-收入]'
    }
  ]));
