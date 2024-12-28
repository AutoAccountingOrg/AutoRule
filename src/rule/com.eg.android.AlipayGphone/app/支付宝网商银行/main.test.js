const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');


test('支付宝网商银行转出', () =>
  testAnkio('支付宝网商银行转出', [
    {
      "type": "Transfer",
      "money": 20000,
      "fee": 0,
      "shopName": '网商银行',
      "shopItem": '转账-转给江大',
      "accountNameFrom": '网商银行(9370)',
      "accountNameTo": '工商银行(8464)',
      "currency": 'CNY',
      "time": 1712916392000,
      "channel": '支付宝[网商银行-转账]',
    },

  ]));

test('支付宝网商银行余额自动转入', () =>
  testAnkio('支付宝网商银行余额自动转入', [
    {
      "type": "Transfer",
      "money": 1706.42,
      "fee": 0,
      "shopName": '网商银行',
      "shopItem": '余额已自动转入',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '网商银行',
      "currency": 'CNY',
      "time": 1730038418000,
      "channel": '支付宝[网商银行-余额自动转入]',
    },

  ]));
test('支付宝网商银行支出', () =>
  testAnkio('支付宝网商银行支出', [
    {
      "type": "Expend",
      "money": 0.33,
      "fee": 0,
      "shopName": '网商银行',
      "shopItem": '支付宝支付',
      "accountNameFrom": '网商银行(9578)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1726667615000,
      "channel": '支付宝[网商银行-支出]',
    },
    {
      "type": "Expend",
      "money": 54.58,
      "fee": 0,
      "shopName": '网商银行',
      "shopItem": '支付宝支付',
      "accountNameFrom": '网商银行(9370)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1728004788000,
      "channel": '支付宝[网商银行-支出]',
    },

  ]));
test('支付宝网商银行他行汇入', () =>
  testAnkio('支付宝网商银行他行汇入', [
    {
      'type': 'Income',
      'money': 3300.00,
      'fee': 0,
      'shopName': '网商银行',
      'shopItem': '他行汇入-来自陈治国',
      'accountNameFrom': '1602',
      'accountNameTo': '网商银行',
      'currency': 'CNY',
      'time': 1734767152000,
      'channel': '支付宝[网商银行-收入]'
    }
  ]));
