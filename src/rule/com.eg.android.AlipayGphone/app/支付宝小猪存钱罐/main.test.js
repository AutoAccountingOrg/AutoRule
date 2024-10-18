const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝小猪存钱罐', () =>
  testAnkio('支付宝小猪存钱罐', [
    {
      "type": "Transfer",
      "money": 0.01,
      "fee": 0,
      "shopName": '余额宝',
      "shopItem": '小猪攒钱罐',
      "accountNameFrom": '工商银行储蓄卡(7432)',
      "accountNameTo": '支付宝余额宝',
      "currency": 'CNY',
      "time": 1729129909000,
      "channel": '支付宝[余额宝-小猪攒钱罐]',
    },
  ]));
