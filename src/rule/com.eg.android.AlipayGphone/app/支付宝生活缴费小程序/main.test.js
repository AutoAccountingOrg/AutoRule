const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝生活缴费小程序燃气费缴费成功', () =>
  testAnkio('支付宝生活缴费小程序燃气费缴费成功', [
    {
      'type': 'Expend',
      'money': 50.6,
      'fee': 0,
      'shopName': '武汉市燃气集团有限公司（卡表）',
      'shopItem': '武汉市江岸区华盛路-98号农房城市花苑3*****25楼4号',
      'accountNameFrom': '',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1732330067000,
      'channel': '支付宝[生活缴费小程序]'
    }
  ]));
