const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');

test('支付宝收入', () =>
  testAnkio('支付宝收入', [
    {
      'type': 'Income',
      'money': 0.02,
      'fee': 0,
      'shopName': '吱信（上海）网络技术有限公司',
      'shopItem': '支付宝发红包，你赚现金奖励',
      'accountNameFrom': '支付宝余额',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1715479904000,
      'channel': '支付宝[消费-收入]'
    },
    {
      'type': 'Income',
      'money': 0.3,
      'fee': 0,
      'shopName': '北京快手科技有限公司 bjk***@kuaishou.com',
      'shopItem': '收款到账￥0.30',
      'accountNameFrom': '支付宝余额',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1714212854000,
      'channel': '支付宝[消费-收入]'
    },
    {
      'type': 'Income',
      'money': 29.82,
      'fee': 0,
      'shopName': '退款通知',
      'shopItem': '退款-麻爪爪·酸辣凤爪·卤味小吃(大朗里悦里店)外卖订单',
      'accountNameFrom': '农业银行储蓄卡(9979)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1710669984000,
      'channel': '支付宝[消费-收入]'
    }
  ]));
