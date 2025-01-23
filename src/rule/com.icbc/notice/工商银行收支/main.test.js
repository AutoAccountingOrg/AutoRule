
const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.icbc');
test('工商银行收入', () =>
  testAnkio('工商银行收入', [
    {
      'type': 'Income',
      'money': 3.70,
      'fee': 0,
      'shopName': '退款支付宝-支付宝',
      'shopItem': '消费',
      'accountNameFrom': '工商银行(1054)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('1月5日15:00', 'M月D日h:i'),
      'channel': '工商银行[收入]'
    }
  ]));

test('工商银行支出', () =>
  testAnkio('工商银行支出', [
    {
      'type': 'Expend',
      'money': 4,
      'fee': 0,
      'shopName': '消费支付宝',
      'shopItem': '谢水生',
      'accountNameFrom': '工商银行(1054)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('1月12日15:56', 'M月D日h:i'),
      'channel': '工商银行[支出]'
    },
    {
      'type': 'Expend',
      'money': 5,
      'fee': 0,
      'shopName': '缴费财付通',
      'shopItem': '北京科技大学',
      'accountNameFrom': '工商银行(9301)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('1月18日16:00', 'M月D日h:i'),
      'channel': '工商银行[支出]'
    }
  ]));


