const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('中国银行入账', () =>
  testAnkio('中国银行入账', [
    {
      'type': 'Income',
      'money': 14800.0,
      'fee': 0,
      'shopName': '',
      'shopItem': '银联入账',
      'accountNameFrom': '中国银行(7575)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('04月12日18:12', 'M月D日h:i'),
      'channel': '微信[中国银行-收入]'
    },
    {
      'type': 'Income',
      'money': 1234.0,
      'fee': 0,
      'shopName': '',
      'shopItem': '工资',
      'accountNameFrom': '中国银行(1234)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('10月25日14:54', 'M月D日h:i'),
      'channel': '微信[中国银行-收入]'
    },
    {
      'type': 'Income',
      'money': 3250.0,
      'fee': 0,
      'shopName': '',
      'shopItem': '奖金',
      'accountNameFrom': '中国银行(3888)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月25日14:49', 'M月D日h:i'),
      'channel': '微信[中国银行-收入]'
    }
  ]));

test('中国银行跨行转入', () =>
  testAnkio('中国银行跨行转入', [
    {
      'type': 'Income',
      'money': 780.22,
      'fee': 0,
      'shopName': '',
      'shopItem': '跨行转入',
      'accountNameFrom': '中国银行(2119)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('09月26日17:25', 'M月D日h:i'),
      'channel': '微信[中国银行-收入]'
    }
  ]));
test('中国银行退款', () =>
  testAnkio('中国银行退款', [
    {
      'type': 'Income',
      'money': 1000.0,
      'fee': 0,
      'shopName': '',
      'shopItem': '网上快捷退款',
      'accountNameFrom': '中国银行(7575)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('04月13日13:02', 'M月D日h:i'),
      'channel': '微信[中国银行-收入]'
    }
  ]));

test('中国银行消费', () =>
  testAnkio('中国银行消费', [
    {
      'type': 'Expend',
      'money': 1000,
      'fee': 0,
      'shopName': '',
      'shopItem': '网上快捷支付',
      'accountNameFrom': '中国银行(7575)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('04月13日13:02', 'M月D日h:i'),
      'channel': '微信[中国银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 31.78,
      'fee': 0,
      'shopName': '',
      'shopItem': '网上快捷支付',
      'accountNameFrom': '中国银行(7575)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('04月12日18:28', 'M月D日h:i'),
      'channel': '微信[中国银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 1000,
      'fee': 0,
      'shopName': '',
      'shopItem': '网上快捷支付',
      'accountNameFrom': '中国银行(7575)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('04月14日14:02', 'M月D日h:i'),
      'channel': '微信[中国银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 30,
      'fee': 0,
      'shopName': '',
      'shopItem': '网上快捷支付',
      'accountNameFrom': '中国银行(0464)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('04月12日19:04', 'M月D日h:i'),
      'channel': '微信[中国银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 5,
      'fee': 0,
      'shopName': '',
      'shopItem': 'POS消费',
      'accountNameFrom': '中国银行(0464)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('05月08日00:34', 'M月D日h:i'),
      'channel': '微信[中国银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 1,
      'fee': 0,
      'shopName': '',
      'shopItem': 'POS消费',
      'accountNameFrom': '中国银行(4193)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('05月24日17:45', 'M月D日h:i'),
      'channel': '微信[中国银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 298.78,
      'fee': 0,
      'shopName': '',
      'shopItem': '转账支出',
      'accountNameFrom': '中国银行(6960)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('07月04日07:54', 'M月D日h:i'),
      'channel': '微信[中国银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 22.49,
      'fee': 0,
      'shopName': '',
      'shopItem': '数字人民币随用随充',
      'accountNameFrom': '中国银行(3697)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('01月01日18:35', 'M月D日h:i'),
      'channel': '微信[中国银行-支出]'
    }

  ]));

test('中国银行信用卡存入', () =>
  testAnkio('中国银行信用卡存入', [
    {
      'type': 'Income',
      'money': 357,
      'fee': 0,
      'shopName': '',
      'shopItem': '存入',
      'accountNameFrom': '中国银行信用卡(5248)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('05月16日11:05', 'M月D日h:i'),
      'channel': '微信[中国银行信用卡-存入]'
    }
  ]));
