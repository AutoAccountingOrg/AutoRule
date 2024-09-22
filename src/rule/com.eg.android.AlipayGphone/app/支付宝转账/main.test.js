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
test('支付宝转账支出', () =>
  testAnkio('支付宝转账支出', [
    {
      "type": "Expend",
      "money": 1,
      "fee": 0,
      "shopName": '百强(**强) 118***@qq.com',
      "shopItem": '转账成功',
      "accountNameFrom": '余额宝',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1723816676000,
      "channel": '支付宝[转账-支出]',
    },
  ]));

test('支付宝转账支出-英文', () =>
  testAnkio('支付宝转账支出-英文', [
    {
      "type": "Expend",
      "money": 0.01,
      "fee": 0,
      "shopName": '1(1) 1**********',
      "shopItem": 'Transfer successful',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1727001374000,
      "channel": '支付宝[转账-支出]',
    },
  ]));

test('支付宝转账收款-英文', () =>
  testAnkio('支付宝转账收款-英文', [
    {
      "type": "Income",
      "money": 0.01,
      "fee": 0,
      "shopName": '11451 1**********',
      "shopItem": 'Transfer received',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1727004014000,
      "channel": '支付宝[转账-收入]',
    },
  ]));