const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
testAnkioInit(get, __dirname, 'com.agricultural.bank');
test('中国农业银行收入', () =>
  testAnkio('中国农业银行收入', [
    {
      'type': 'Income',
      'money': 90000,
      'fee': 0,
      'shopName': '中国农业银行',
      'shopItem': '您尾号为2473的农行借记卡于12月30日10:52发生一笔收入90000.00元，详情请点击',
      'accountNameFrom': '中国农业银行(2473)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1735527153163,
      'channel': '中国农业银行[收入]'
    }
  ]));
