const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('江苏银行信用卡消费', () =>
  testAnkio('江苏银行信用卡消费', [
    {
      "type": "Expend",
      "money": 17.03,
      "fee": 0,
      "shopName": '',
      "shopItem": '网银在线（京东支付）-京东商城业务',
      "accountNameFrom": '江苏银行(6706)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('06月13日 07:38', 'M月D日 h:i'),
      "channel": '微信[江苏银行-消费]',
    },

  ]));
