
const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');

testAnkioInit(get, __dirname, 'com.android.phone');

test('招商银行支出', () =>
  testAnkio('招商银行支出', [
    {
      "type": "Expend",
      "money": 27.78,
      "fee": 0,
      "shopName": '',
      "shopItem": '财付通-滴滴出行快捷',
      "accountNameFrom": '招商银行(0877)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("12月03日22:44", "M月D日h:i"),
      "channel": '招商银行[消费]',
    }
  ]));

test('招商银行信用卡还款', () =>
  testAnkio('招商银行信用卡还款', [
    {
      "type": "Transfer",
      "money": 322261.6,
      "fee": 0,
      "shopName": '收拾收拾',
      "shopItem": '信用卡还款',
      "accountNameFrom": '招商银行(6598)',
      "accountNameTo": '招商银行信用卡(1356)',
      "currency": 'CNY',
      "time": formatDate("09月26日12:20", "M月D日h:i"),
      "channel": '招商银行[还款]',
    },
  ]));

test('招商银行收入', () =>
  testAnkio('招商银行收入', [
    {
      "type": "Income",
      "money": 0.09,
      "fee": 0,
      "shopName": '微信零钱提现/微信零钱提现',
      "shopItem": '银联入账',
      "accountNameFrom": '招商银行(1999)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("11月12日15:04", "M月D日h:i"),
      "channel": '招商银行[入账]',
    },
    {
      'type': 'Income',
      'money': 0.01,
      'fee': 0,
      'shopName': '',
      'shopItem': '银联卡转入',
      'accountNameFrom': '招商银行(1234)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月27日', 'M月D日'),
      'channel': '招商银行[转入]'
    },
    {
      'type': 'Income',
      'money': 1000.00,
      'fee': 0,
      'shopName': '',
      'shopItem': '工资',
      'accountNameFrom': '招商银行(7632)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月10日15:30', 'M月D日h:i'),
      'channel': '招商银行[工资]'
    }
  ]));

test('招商银行退款', () =>
  testAnkio('招商银行退款', [
    {
      'type': 'Income',
      'money': 4529.48,
      'fee': 0,
      'shopName': '',
      'shopItem': '支付宝-盈思网络科技（深圳）有限公司',
      'accountNameFrom': '招商银行(0877)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月16日23:38', 'M月D日h:i'),
      'channel': '招商银行[退款]'
    }
  ]));
