const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('浦发银行消费', () =>
  testAnkio('浦发银行消费', [
    {
      "type": "Expend",
      "money": 3,
      "fee": 0,
      "shopName": '',
      "shopItem": '支付宝-美宜佳（湖北）便利店...',
      "accountNameFrom": '浦发银行信用卡(7928)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('07月08日 12:15', 'M月D日 h:i'),
      "channel": '微信[浦发银行信用卡-消费]',
    },
  ]));
