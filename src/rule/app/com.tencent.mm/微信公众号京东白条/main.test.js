const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');
test('京东白条还款', () =>
  testAnkio('京东白条还款', [
    {
      type: 0,
      money: 20.49,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '',
      accountNameTo: '京东白条',
      currency: 'CNY',
      time: `${new Date().getFullYear()}年4月15日`,
      channel: '微信[京东白条 还款]',
    },
  ]));
