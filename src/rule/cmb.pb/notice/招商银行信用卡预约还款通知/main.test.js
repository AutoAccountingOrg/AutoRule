const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
testAnkioInit(get, __dirname, 'com.cmbchina.ccd');
test('招商银行信用卡预约还款', () =>
  testAnkio('招商银行信用卡预约还款', [
    {
      'type': 'Transfer',
      'money': 3905.14,
      'fee': 0,
      'shopName': '招商银行',
      'shopItem': '您尾号6598的账户信用卡预约还款人民币3905.14元',
      'accountNameFrom': '招商银行预约还款卡',
      'accountNameTo': '招商银行信用卡(6598)',
      'currency': 'CNY',
      'time': 1734931087075,
      'channel': '招商银行[预约还款]'
    }
  ]));
