const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

testAnkioInit(get, __dirname, DataType.App, 'com.eg.android.AlipayGphone');
test('支付宝小荷包', () =>
  testAnkio('支付宝小荷包', [
    {
      "type": 2,
      "money": 5,
      "fee": 0,
      "shopName": '支付宝小荷包(某某某的情侣小荷包)',
      "shopItem": '支付宝小荷包-自动攒',
      "accountNameFrom": '余额宝',
      "accountNameTo": '支付宝小荷包(某某某的情侣小荷包)',
      "currency": 'CNY',
      "time": 1713229525000,
      "channel": '支付宝[小荷包-收入]',
    },
    {
      "type": 1,
      "money": 1000,
      "fee": 0,
      "shopName": '某某某的情侣小荷包',
      "shopItem": '**向支付宝小荷包转入￥1000.00',
      "accountNameFrom": '支付宝小荷包(某某某的情侣小荷包)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1716194408000,
      "channel": '支付宝[小荷包-收入]',
    },
    {
      "type": 1,
      "money": 0.15,
      "fee": 0,
      "shopName": '某某某的情侣小荷包',
      "shopItem": '昨日收益：+0.15',
      "accountNameFrom": '支付宝小荷包(某某某的情侣小荷包)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1716081246000,
      "channel": '支付宝[小荷包-收入]',
    },
  ]));

