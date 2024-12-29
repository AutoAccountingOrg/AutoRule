const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝亲情卡消费', () =>
  testAnkio('支付宝亲情卡支付', [
    {
      'type': 'Expend',
      'money': 29.9,
      'fee': 0,
      'shopName': '亲情卡消费提醒赠卡人',
      'shopItem': '你的亲情卡剩余970.10元',
      'accountNameFrom': '支付宝亲情卡',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1721111073000,
      'channel': '支付宝[亲情卡-消费]'
    }
  ]));
