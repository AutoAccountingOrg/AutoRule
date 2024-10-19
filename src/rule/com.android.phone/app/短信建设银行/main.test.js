const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('建设银行信用卡支出', () =>
  testAnkio('建设银行信用卡支出', [
    {
      "type": "Expend",
      "money": 858,
      "fee": 0,
      "shopName": '',
      "shopItem": '消费/预付款',
      "accountNameFrom": '建设银行信用卡(1234)',
      "accountNameTo": '',
      "currency": 'JPY',
      "time": formatDate("10月02日23:00","M月D日h:i"),
      "channel": '建设银行信用卡[消费]',
    },
    {
      "type": "Expend",
      "money": 14.93,
      "fee": 0,
      "shopName": '',
      "shopItem": '消费（美团支付-美团支…）',
      "accountNameFrom": '建设银行信用卡(5082)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("10月09日11:18","M月D日h:i"),
      "channel": '建设银行信用卡[消费]',
    },
  ]));
