const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信支付收款（商家付款）', () =>
  testAnkio('微信支付收款（商家付款）', [
    {
      'type': 'Income',
      'money': 0.1,
      'fee': 0,
      'shopName': '宿迁兆盈商服科技有限公司',
      'shopItem': '你收到一笔分销佣金',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-收款（商家）]'
    },
    {
      'type': 'Income',
      'money': 5,
      'fee': 0,
      'shopName': '兆纳科技',
      'shopItem': '淘金城镇',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-收款（商家）]'
    },
    {
      'type': 'Income',
      'money': 1.2,
      'fee': 0,
      'shopName': '臻鼎',
      'shopItem': '番茄小说提现',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-收款（商家）]'
    },
    {
      'type': 'Income',
      'money': 10,
      'fee': 0,
      'shopName': '元梦之星',
      'shopItem': '元梦之星',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-收款（商家）]'
    },

    {
      'type': 'Income',
      'money': 0.1,
      'fee': 0,
      'shopName': '宿迁兆盈商服科技有限公司',
      'shopItem': '你收到一笔分销佣金',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-收款（商家）]'
    },
    {
      'type': 'Income',
      'money': 0.66,
      'fee': 0,
      'shopName': '可口可乐',
      'shopItem': 'COSTA 开盖100%中奖 ￥6666天天送',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-收款（商家）]'
    }
  ]));
