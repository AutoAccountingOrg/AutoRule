const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信支付转账到银行卡', () =>
  testAnkio('微信支付转账到银行卡', [
    {
      'type': 'Transfer',
      'money': 1500,
      'fee': 0,
      'shopName': '鲍灯兴',
      'shopItem': '转账资金已到账对方银行卡账户',
      'accountNameFrom': '微信零钱',
      'accountNameTo': '农业银行(8879)',
      'currency': 'CNY',
      'time': formatDate('2024-09-19 11:42', 'Y-M-D h:i'),
      'channel': '微信[微信支付-转账到银行卡]'
    }
  ]));
