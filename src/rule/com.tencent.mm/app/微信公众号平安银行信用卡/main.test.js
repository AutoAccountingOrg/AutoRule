const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('平安银行信用卡消费', () =>
  testAnkio('平安银行信用卡消费', [
    {
      "type": "Expend",
      "money": 56.02,
      "fee": 5,
      "shopName": '',
      "shopItem": '信用卡5元刷卡金已使用',
      "accountNameFrom": '平安银行信用卡',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年04月30日 16:21', 'Y年M月D日 h:i'),
      "channel": '微信[平安银行信用卡-消费]',
    },
  ]));

test('平安银行信用卡退款', () =>
  testAnkio('平安银行信用卡退款', [
    {
      "type": "Income",
      "money": 184.9,
      "fee": 0,
      "shopName": '信用卡退款',
      "shopItem": '抵扣10月账单',
      "accountNameFrom": '平安银行信用卡',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('10月09日', 'M月D日'),
      "channel": '微信[平安银行信用卡-退款]',
    },
  ]));
