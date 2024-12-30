const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.gxbbank');
test('广西北部湾银行转入', () =>
  testAnkio('广西北部湾银行转入', [
    {
      'type': 'Income',
      'money': 2065.00,
      'fee': 0,
      'shopName': '广西北部湾银行',
      'shopItem': '您尾号9820的账户发生转入交易，人民币2065.00元',
      'accountNameFrom': '广西北部湾银行(9820)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1735537788207,
      'channel': '广西北部湾银行[转入]'
    }
  ]));
