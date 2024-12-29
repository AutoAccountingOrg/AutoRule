const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝消费', () =>
  testAnkio('支付宝消费', [
    {
      'type': 'Expend',
      'money': 19.9,
      'fee': 0,
      'shopName': '广州市动景计算机科技有限公司',
      'shopItem': '夸克网盘会员(月/季/年)',
      'accountNameFrom': '长沙银行储蓄卡(2754)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1712524722000,
      'channel': '支付宝[消费-支出]'
    },
    {
      'type': 'Expend',
      'money': 183,
      'fee': 0,
      'shopName': '滴滴平台第三方油站',
      'shopItem': '付款成功￥183.00 ',
      'accountNameFrom': '农业银行储蓄卡(9979)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1710680143000,
      'channel': '支付宝[消费-支出]'
    },
    {
      'type': 'Expend',
      'money': 55,
      'fee': 0,
      'shopName': '173******86(未实名)',
      'shopItem': '付款成功￥55.00 ',
      'accountNameFrom': '北京银行信用购(原花呗)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1712723745000,
      'channel': '支付宝[消费-支出]'
    },
    {
      'type': 'Expend',
      'money': 19,
      'fee': 0,
      'shopName': '武汉供电公司',
      'shopItem': '付款成功￥19.00 ',
      'accountNameFrom': '花呗',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1726901065000,
      'channel': '支付宝[消费-支出]'
    }

  ]));

test('支付宝消费-英文', () =>
  testAnkio('支付宝消费-英文', [
    {
      'type': 'Expend',
      'money': 14.9,
      'fee': 0,
      'shopName': '东南大学',
      'shopItem': 'Payment successful￥14.90 ',
      'accountNameFrom': 'BOC Debit Card(9372)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1726910854000,
      'channel': '支付宝[消费-支出]'
    }
  ]));

test('支付宝基金购买', () =>
  testAnkio('支付宝基金购买', [
    {
      'type': 'Transfer',
      'money': 40,
      'fee': 0,
      'shopName': '蚂蚁财富-蚂蚁（杭州）基金销售有限公司',
      'shopItem': '付款成功￥40.00 ',
      'accountNameFrom': '余额宝',
      'accountNameTo': '支付宝基金',
      'currency': 'CNY',
      'time': 1731048346000,
      'channel': '支付宝[消费-支出]'
    }
  ]));
