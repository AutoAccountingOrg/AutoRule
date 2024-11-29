const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝基金卖出', () =>
  testAnkio('支付宝基金卖出', [
    {
      "type": "Transfer",
      "money": 37.97,
      "fee": 0,
      "shopName": '汇添富蓝筹稳健灵活配置混合A',
      "shopItem": '你有卖出资金到账',
      "accountNameFrom": '支付宝基金',
      "accountNameTo": '支付宝基金银行卡',
      "currency": 'CNY',
      "time": 1715135058000,
      "channel": '支付宝[基金-收入]',
    },
    {
      "type": "Transfer",
      "money": 63.04,
      "fee": 0,
      "shopName": '国泰中证煤炭ETF联接C',
      "shopItem": '你有卖出资金到账',
      "accountNameFrom": '支付宝基金',
      "accountNameTo": '余额宝',
      "currency": 'CNY',
      "time": 1731051311000,
      "channel": '支付宝[基金-收入]',
    },
  ]));
