const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('日照银行收入', () =>
  testAnkio('日照银行收入', [
    {
      'type': 'Income',
      'money': 0.54,
      'fee': 0,
      'shopName': '',
      'shopItem': '收款（转账）',
      'accountNameFrom': '日照银行(6230****7644)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年09月24日 19:09:33', 'Y年M月D日 h:i:s'),
      'channel': '微信[日照银行-收入]'
    }
  ]));
