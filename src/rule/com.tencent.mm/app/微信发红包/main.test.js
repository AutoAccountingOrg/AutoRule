const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信发红包', () =>
  testAnkio('微信发红包', [
    {
      'type': 'Expend',
      'money': 15,
      'fee': 0,
      'shopName': '大清宝泉',
      'shopItem': '恭喜发财，大吉大利',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1734925199286,
      'channel': '微信[微信支付-发红包]'
    }
  ]));
