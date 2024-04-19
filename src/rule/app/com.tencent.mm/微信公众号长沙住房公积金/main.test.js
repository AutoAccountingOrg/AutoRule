const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');
test('长沙住房公积金每月汇缴', () =>
  testAnkio('长沙住房公积金每月汇缴', [
    {
      type: 1,
      money: 2154,
      fee: 0,
      shopName: '长沙住房公积金',
      shopItem: '汇缴[202404]',
      accountNameFrom: '住房公积金账户',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('20240410', 'YMD'),
      channel: '微信[长沙公积金汇缴]',
    },
  ]));
