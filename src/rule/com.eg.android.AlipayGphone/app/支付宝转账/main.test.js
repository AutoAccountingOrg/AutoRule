const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝转账收款', () =>
  testAnkio('支付宝转账收款', [
    {
      "type": "Income",
      "money": 0.01,
      "fee": 0,
      "shopName": '从前慢 185******30',
      "shopItem": '收到一笔转账',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1697209372000,
      "channel": '支付宝[转账-收入]',
    },
  ]));
test('支付宝转账提现', () =>
  testAnkio('支付宝转账提现', [
    {
      "type": "Transfer",
      "money": 161,
      "fee": 0,
      "shopName": '招商银行（6876）刘金龙',
      "shopItem": '提现到账成功',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1719663370000,
      "channel": '支付宝[转账-提现]',
    },
  ]));
