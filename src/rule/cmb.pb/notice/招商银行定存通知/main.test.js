const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.sankuai.meituan');
test('招商银行定存通知', () =>
  testAnkio('招商银行定存', [
    {
      'type': 'Transfer',
      'money': 3000,
      'fee': 0,
      'shopName': '招商银行',
      'shopItem': '产品代码: XDC20233622, 年利率: 1.80%',
      'accountNameFrom': '招商银行（6598）',
      'accountNameTo': '招商银行定存',
      'currency': 'CNY',
      'time': 1736985714404,
      'channel': '招商银行[定存]'
    }
  ]));
