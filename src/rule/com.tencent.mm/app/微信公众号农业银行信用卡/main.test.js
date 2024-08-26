const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('农业银行信用卡支出', () =>
  testAnkio('农业银行信用卡支出', [
    {
      type: 0,
      money: 1281.56,
      fee: 0,
      shopName: '财付通，微信支付',
      shopItem: '京东商城平台商户',
      accountNameFrom: '农业银行信用卡(5981)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('2024-05-26 20:09:20', 'Y-M-D h:i:s'),
      channel: '微信[农业银行信用卡-支出]',
    },
  ]));
