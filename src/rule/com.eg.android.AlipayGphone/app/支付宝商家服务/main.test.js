const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');


test('支付宝商家收款', () =>
  testAnkio('支付宝商家收款', [
    {
      "type": 1,
      "money": 0.01,
      "fee": 0,
      "shopName": '老顾客消费',
      "shopItem": '今日第4笔收入，共计¥0.04',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1703056950000,
      "channel": '支付宝[商家服务-收入]',
    },

  ]));
