const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('兴业银行信用卡支出', () =>
  testAnkio('兴业银行信用卡支出', [
    {
      'type': 'Expend',
      'money': 6.8,
      'fee': 0,
      'shopName': '抖音支付快捷',
      'shopItem': '抖店平台商户',
      'accountNameFrom': '兴业银行信用卡(0000)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('11月24日19点37分59秒', 'M月D日h点i分s秒'),
      'channel': '微信[兴业银行信用卡-支出]'
    }
  ]));
