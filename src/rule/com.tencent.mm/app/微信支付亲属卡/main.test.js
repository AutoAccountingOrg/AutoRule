const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信支付亲属卡扣款', () =>
  testAnkio('微信支付亲属卡扣款', [
    {
      'type': 'Expend',
      'money': 18,
      'fee': 0,
      'shopName': 'Nigori',
      'shopItem': '姚先生饸饹面',
      'accountNameFrom': '招商银行储蓄卡(1956)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate(),
      'channel': '微信[微信支付-亲属卡消费]'
    }
  ]));
