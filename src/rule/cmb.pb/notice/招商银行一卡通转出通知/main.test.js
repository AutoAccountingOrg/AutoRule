const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'cmb.pb');
test('招商银行一卡通转出', () =>
  testAnkio('招商银行一卡通转出', [
    {
      type: 'Transfer',
      money: 5650,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '招商银行(0877)',
      accountNameTo: '',
      currency: 'CNY',
      time: '',
      channel: '招商银行[消费]'
    },
  ]));
