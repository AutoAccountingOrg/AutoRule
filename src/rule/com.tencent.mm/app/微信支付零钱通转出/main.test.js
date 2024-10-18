const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信支付零钱通转出', () =>
  testAnkio('微信支付零钱通转出', [
    {
      "type": "Transfer",
      "money": 1245,
      "fee": 0,
      "shopName": '零钱通',
      "shopItem": '资金已经从零钱通转出至指定账户',
      "accountNameFrom": '零钱通',
      "accountNameTo": '招商银行(6598)',
      "currency": 'CNY',
      "time": 1729137577264,
      "channel": '微信[微信支付-零钱通转出到账]',
    },
  ]));
