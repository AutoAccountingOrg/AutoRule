const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('京东支付消费', () =>
  testAnkio('京东支付消费', [
    {
      type: 0,
      money: 25.2,
      fee: 0,
      shopName: '京东平台商户',
      shopItem: '',
      accountNameFrom: '招行信用卡(尾号1356)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('2024-05-02 18:58:44', 'Y-M-D h:i:s'),
      channel: '微信[京东支付-消费]',
    },
  ]));
