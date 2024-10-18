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


test('江苏银行信用卡还款', () =>
  testAnkio('江苏银行信用卡还款', [
    {
      "type": "Transfer",
      "money": 1795.68,
      "fee": 0,
      "shopName": '',
      "shopItem": '支付宝-信用卡还款信用卡还款 ',
      "accountNameFrom": '',
      "accountNameTo": '江苏银行(6706)',
      "currency": 'CNY',
      "time": formatDate('09月26日 12:21', 'M月D日 h:i'),
      "channel": '微信[江苏银行-消费]',
    },

  ]));


test('江苏银行信用卡退货', () =>
  testAnkio('江苏银行信用卡退货', [
    {
      "type": "Income",
      "money": 538,
      "fee": 0,
      "shopName": '',
      "shopItem": '支付宝-成都卓祥贸易有限公司 ',
      "accountNameFrom": '',
      "accountNameTo": '江苏银行(6706)',
      "currency": 'CNY',
      "time": formatDate('10月04日 14:51', 'M月D日 h:i'),
      "channel": '微信[江苏银行-退货]',
    },

  ]));
