
const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝小荷包', () =>
  testAnkio('支付宝小荷包', [
    {
      'type': 'Transfer',
      'money': 5,
      'fee': 0,
      'shopName': '支付宝小荷包(某某某的情侣小荷包)',
      'shopItem': '支付宝小荷包-自动攒',
      'accountNameFrom': '余额宝',
      'accountNameTo': '支付宝小荷包(某某某的情侣小荷包)',
      'currency': 'CNY',
      'time': 1713229525000,
      'channel': '支付宝[小荷包-自动攒]'
    },
    {
      'type': 'Income',
      'money': 1000,
      'fee': 0,
      'shopName': '某某某的情侣小荷包',
      'shopItem': '**向支付宝小荷包转入￥1000.00',
      'accountNameFrom': '支付宝小荷包(某某某的情侣小荷包)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1716194408000,
      'channel': '支付宝[小荷包-收入]'
    },
    {
      'type': 'Income',
      'money': 0.15,
      'fee': 0,
      'shopName': '某某某的情侣小荷包',
      'shopItem': '昨日收益：+0.15',
      'accountNameFrom': '支付宝小荷包(某某某的情侣小荷包)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1716081246000,
      'channel': '支付宝[小荷包-收入]'
    },
    {
      'type': 'Transfer',
      'money': 30,
      'fee': 0,
      'shopName': '某某的小荷包',
      'shopItem': '自动攒执行成功转入30.00元',
      'accountNameFrom': '',
      'accountNameTo': '某某的小荷包',
      'currency': 'CNY',
      'time': 1727744614000,
      'channel': '支付宝[小荷包-自动攒]'
    },
    {
      'type': 'Expend',
      'money': 49,
      'fee': 0,
      'shopName': '🏠🏠🏠',
      'shopItem': '**芳使用小荷包支付了￥49.00',
      'accountNameFrom': '支付宝小荷包(🏠🏠🏠)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1735486010000,
      'channel': '支付宝[小荷包-支付]'
    },
    {
      'type': 'Income',
      'money': 41.97,
      'fee': 0,
      'shopName': '🏠🏠🏠',
      'shopItem': '支付宝小荷包收到退款¥41.97',
      'accountNameFrom': '支付宝小荷包(🏠🏠🏠)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1737092609000,
      'channel': '支付宝[小荷包-退款]'
    }
  ]));
