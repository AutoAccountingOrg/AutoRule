const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');
test('平安银行信用卡消费', () =>
  testAnkio('平安银行信用卡消费', [
    {
      type: 0,
      money: 51.02,
      fee: 5,
      shopName: '信用卡5元刷卡金已使用',
      shopItem: '',
      accountNameFrom: '平安银行信用卡',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('2024年04月30日 16:21', 'Y年M月D日 h:i'),
      channel: '微信[平安银行信用卡 - 消费]',
    },
  ]));
