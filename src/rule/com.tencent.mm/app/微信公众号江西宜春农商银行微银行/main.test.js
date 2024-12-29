const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('江西宜春农商银行微银行支出', () =>
  testAnkio('江西宜春农商银行微银行支出', [
    {
      'type': 'Expend',
      'money': 500,
      'fee': 0,
      'shopItem': '张三',
      'shopName': '超级网银往贷-转出',
      'accountNameFrom': '江西宜春农商银行',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年10月13日 08:43:11', 'Y年M月D日 h:i:s'),
      'channel': '微信[江西宜春农商银行微银行-支出]'
    }
  ]));
test('江西宜春农商银行微银行收入', () =>
  testAnkio('江西宜春农商银行微银行收入', [
    {
      'type': 'Income',
      'money': 1896,
      'fee': 0,
      'shopName': '乡补绩效',
      'shopItem': '转入',
      'accountNameFrom': '江西宜春农商银行',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年10月12日 16:43:23', 'Y年M月D日 h:i:s'),
      'channel': '微信[江西宜春农商银行微银行-收入]'
    }
  ]));
