const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('提现到账', () =>
  testAnkio('提现到账', [
    {
      "type": "Transfer",
      "money": 7.0,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '微信经营账户',
      "accountNameTo": '四川农信(1586)',
      "currency": 'CNY',
      "time": formatDate("2024-05-31 08:23:27","Y-M-D h:i:s"),
      "channel": '微信[微信收款助手-提现]',
    },
  ]));

test('微信商家收款', () =>
  testAnkio('微信商家收款', [
    {
      "type": "Income",
      "money": 1.5,
      "fee": 0,
      "shopName": 'A创印（恒晟）广告图文1线',
      "shopItem": '该顾客累计消费4次(捧场老客)',
      "accountNameFrom": '微信经营账户',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信收款助手-经营收款]',
    },
    {
      "type": "Income",
      "money": 0.1,
      "fee": 0,
      "shopName": '',
      "shopItem": '今日第1笔收款，共计￥0.10',
      "accountNameFrom": '微信零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信收款助手-经营收款]',
    },
  ]));
