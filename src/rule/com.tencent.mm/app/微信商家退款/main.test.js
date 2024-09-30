const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信支付退款', () =>
  testAnkio('微信支付退款', [
    {
      "type": "Income",
      "money": 10.93,
      "fee": 0,
      "shopName": '拼多多平台商户',
      "shopItem": '商户单号XP1124052116500189874886000731',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-05-25 11:21:52', 'Y-M-D h:i:s'),
      "channel": '微信[微信支付-商家退款]',
    },
    {
      "type": "Income",
      "money": 166.6,
      "fee": 0,
      "shopName": '美团',
      "shopItem": '美团订单-24052911100400001306304144901069',
      "accountNameFrom": '支付卡(建设银行8254)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-06-01 20:35:34', 'Y-M-D h:i:s'),
      "channel": '微信[微信支付-商家退款]',
    },
  ]));
