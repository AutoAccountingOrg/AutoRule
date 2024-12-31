const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'cmb.pb');
test('掌上生活消费通知', () =>
  testAnkio('掌上生活消费通知', [
    {
      'type': 'Expend',
      'money': 29.96,
      'fee': 0,
      'shopName': '美团支付',
      'shopItem': '美团App酱新香酥鸡饼(鸡柳拌饼益',
      'accountNameFrom': '招商银行信用卡',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1735045607824,
      'channel': '掌上生活[信用卡消费]'
    }
  ]));
