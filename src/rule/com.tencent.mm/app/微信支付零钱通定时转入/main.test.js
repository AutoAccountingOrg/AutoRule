const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信支付零钱通定时转入', () =>
  testAnkio('微信支付零钱通定时转入', [
    {
      "type": "Transfer",
      "money": 5000,
      "fee": 0,
      "shopName": '零钱通',
      "shopItem": '累计转入¥22500.00',
      "accountNameFrom": '宁波银行(7715)',
      "accountNameTo": '零钱通',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-零钱通定时转入]',
    },
    {
      "type": "Transfer",
      "money": 5000,
      "fee": 0,
      "shopName": '零钱通',
      "shopItem": '累计转入¥307500.00',
      "accountNameFrom": '招商银行(3598)',
      "accountNameTo": '零钱通',
      "currency": 'CNY',
      "time": 1731726366110,
      "channel": '微信[微信支付-零钱通定时转入]',
    },
  ]));
