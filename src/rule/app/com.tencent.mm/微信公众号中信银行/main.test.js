const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('中信银行收入', () =>
  testAnkio('中信银行收入', [
    {
      type: 1,
      money: 1500,
      fee: 0,
      shopName: '',
      shopItem: '实发房补',
      accountNameFrom: '中信银行储蓄卡(8137)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('5月7日10:50', 'M月D日h:i'),
      channel: '微信[中信银行-收入]',
    },
    {
      type: 1,
      money: 4770.33,
      fee: 0,
      shopName: '',
      shopItem: '实发工资',
      accountNameFrom: '中信银行储蓄卡(8137)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('5月7日10:49', 'M月D日h:i'),
      channel: '微信[中信银行-收入]',
    },
    {
      type: 1,
      money: 37.13,
      fee: 0,
      shopName: '',
      shopItem: '财付通快捷支付存入-京东商城平台商户',
      accountNameFrom: '中信银行储蓄卡(5174)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('5月27日00:42', 'M月D日h:i'),
      channel: '微信[中信银行-收入]',
    },
  ]));
