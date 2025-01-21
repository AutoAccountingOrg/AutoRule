const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.xiaomi.smartcard');
test('小米智能卡消费', () =>
  testAnkio('小米智能卡消费', [
    {
      'type': 'Expend',
      'money': 2.70,
      'fee': 0,
      'shopName': '长安通互联互通卡',
      'shopItem': '刷卡完成，交易金额：2.70元',
      'accountNameFrom': '小米智能卡(长安通互联互通卡)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1737450506088,
      'channel': '小米智能卡[支出]'
    }
  ]));
