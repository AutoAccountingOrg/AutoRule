const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');



test('支付宝转账到银行卡', () =>
  testAnkio('支付宝转账到银行卡', [
    {
      "type": "Transfer",
      "money": 500,
      "fee": 0,
      "shopName": '转账到银行卡',
      "shopItem": '转出到账成功',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '中信银行(5792)',
      "currency": 'CNY',
      "time": 1729359863000,
      "channel": '支付宝[转账到银行卡]',
    },
  ]));
