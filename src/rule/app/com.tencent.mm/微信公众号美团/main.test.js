const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');
test('美团消费', () =>
  testAnkio('美团消费', [
    {
      type: 0,
      money: 34.69,
      fee: 0,
      shopName: '美团',
      shopItem: '185****6220',
      accountNameFrom: '招商银行信用卡(1356)',
      accountNameTo: '',
      currency: 'CNY',
      time: '2024年04月11日 18:05',
      channel: '微信[美团消费]',
    },
    {
      type: 0,
      money: 19.68,
      fee: 0,
      shopName: '美团',
      shopItem: '185****6210',
      accountNameFrom: '招商银行信用卡(1356)',
      accountNameTo: '',
      currency: 'CNY',
      time: '2024年04月12日 10:53',
      channel: '微信[美团消费]',
    },
    {
      type: 0,
      money: 29,
      fee: 0,
      shopName: '美团',
      shopItem: '133****6923',
      accountNameFrom: '美团月付',
      accountNameTo: '',
      currency: 'CNY',
      time: '2024-04-12 15:29:46',
      channel: '微信[美团消费]',
    },
  ]));
