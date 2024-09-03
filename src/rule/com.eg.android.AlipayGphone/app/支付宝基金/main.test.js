const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

testAnkioInit(get, __dirname, DataType.App, 'com.eg.android.AlipayGphone');
test('支付宝基金卖出', () =>
  testAnkio('支付宝基金卖出', [
    {
      "type": 1,
      "money": 37.97,
      "fee": 0,
      "shopName": '汇添富蓝筹稳健灵活配置混合A',
      "shopItem": '你有卖出资金到账',
      "accountNameFrom": '支付宝基金银行卡',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1715135058000,
      "channel": '支付宝[基金-收入]',
    },
  ]));
