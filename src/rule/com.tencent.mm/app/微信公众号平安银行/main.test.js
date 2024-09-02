const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');
test('平安银行消费', () =>
  testAnkio('平安银行消费', [
    {
      "type": 0,
      "money": 0.01,
      "fee": 0,
      "shopName": '财付通快捷支付',
      "shopItem": '微信红包-微信红包',
      "accountNameFrom": '平安银行(6274)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年05月23日09:14', 'Y年M月D日h:i'),
      "channel": '微信[平安银行-消费]',
    },
  ]));
