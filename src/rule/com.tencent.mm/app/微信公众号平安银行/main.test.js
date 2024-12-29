const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('平安银行消费', () =>
  testAnkio('平安银行消费', [
    {
      'type': 'Expend',
      'money': 0.01,
      'fee': 0,
      'shopName': '财付通快捷支付',
      'shopItem': '微信红包-微信红包',
      'accountNameFrom': '平安银行(6274)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年05月23日09:14', 'Y年M月D日h:i'),
      'channel': '微信[平安银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 0.01,
      'fee': 0,
      'shopName': '',
      'shopItem': '转账转出',
      'accountNameFrom': '平安银行(6274)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('6月14日 16:33', 'M月D日 h:i'),
      'channel': '微信[平安银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 28.73,
      'fee': 0,
      'shopName': '支付宝快捷支付',
      'shopItem': '中国电信股份有限公司-商...',
      'accountNameFrom': '平安银行(8888)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年10月23日14:07', 'Y年M月D日h:i'),
      'channel': '微信[平安银行-支出]'
    }
  ]));

test('平安银行收入', () =>
  testAnkio('平安银行收入', [
    {
      'type': 'Income',
      'money': 3.8,
      'fee': 0,
      'shopName': '',
      'shopItem': '红包提现转入',
      'accountNameFrom': '平安银行(8888)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('10月16日 18:30', 'M月D日 h:i'),
      'channel': '微信[平安银行-收入]'
    }
  ]));
