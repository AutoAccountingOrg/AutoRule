const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');




test('支付宝笔笔攒转入', () =>
  testAnkio('支付宝笔笔攒转入', [
    {
      "type": "Transfer",
      "money": 1.88,
      "fee": 0,
      "shopName": '余额宝',
      "shopItem": '笔笔攒转入成功￥1.88 ',
      "accountNameFrom": '工商银行储蓄卡(2441)',
      "accountNameTo": '余额宝',
      "currency": 'CNY',
      "time": 1728142125000,
      "channel": '支付宝[笔笔攒-转入]',
    },
  ]));
