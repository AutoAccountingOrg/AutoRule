const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('招商银行信用卡消费', () =>
  testAnkio('招商银行信用卡消费', [
    {
      type: 0,
      money: 34.69,
      shopName: '美团-牛约堡手(旭辉店)',
      shopItem: '',
      accountNameFrom: '招商银行信用卡（1356）',
      accountNameTo: '',
      fee: 0,
      currency: 'CNY',
      time: formatDate('04月11日18:05', 'M月D日h:i'),
      channel: '微信[招行信用卡消费]',
    },
    {
      type: 0,
      money: 19.68,
      shopName: '美团-奉天熏六记熏拌鸡架（马坡店）',
      shopItem: '',
      accountNameFrom: '招商银行信用卡（1356）',
      accountNameTo: '',
      fee: 0,
      currency: 'CNY',
      time: formatDate('04月12日10:53', 'M月D日h:i'),
      channel: '微信[招行信用卡消费]',
    },
  ]));

test('招商银行信用卡还款', () =>
  testAnkio('招商银行信用卡还款', [
    {
      type: 2,
      money: 324.25,
      shopName: '',
      shopItem: '',
      accountNameTo: '招商银行信用卡',
      accountNameFrom: '招商银行信用卡自动还款账户',
      fee: 0,
      currency: 'CNY',
      time: formatDate('2024年04月13日17:11:44', 'Y年M月D日h:i:s'),
      channel: '微信[招行信用卡还款]',
    },
  ]));
