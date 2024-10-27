const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('中国建设银行收入', () =>
  testAnkio('中国建设银行收入', [
    {
      "type": "Income",
      "money": 100,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '中国建设银行储蓄卡(5926)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年5月8日 00:56:08', 'Y年M月D日 h:i:s'),
      "channel": '微信[中国建设银行-收入]',
    },
    {
      "type": "Income",
      "money": 23.6,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '中国建设银行储蓄卡(4053)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年5月7日 22:30:39', 'Y年M月D日 h:i:s'),
      "channel": '微信[中国建设银行-收入]',
    },
  ]));
test('中国建设银行支出', () =>
  testAnkio('中国建设银行支出', [
    {
      "type": "Expend",
      "money": 15.8,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '中国建设银行储蓄卡(4053)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年5月7日 20:24:29', 'Y年M月D日 h:i:s'),
      "channel": '微信[中国建设银行-支出]',
    },
    {
      "type": "Expend",
      "money": 21.8,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '中国建设银行储蓄卡(7789)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年5月14日 22:12:56', 'Y年M月D日 h:i:s'),
      "channel": '微信[中国建设银行-支出]',
    },
  ]));
test('中国建设银行信用卡支出', () =>
  testAnkio('中国建设银行信用卡支出', [
    {
      "type": "Expend",
      "money": 29.9,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '中国建设银行信用卡(8254)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('5月17日 17时52分', 'M月D日 h时i分'),
      "channel": '微信[中国建设银行信用卡-支出]',
    },
    {
      "type": "Expend",
      "money": 198 ,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '中国建设银行信用卡(0000)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('10月27日 14时15分', 'M月D日 h时i分'),
      "channel": '微信[中国建设银行信用卡-支出]',
    },

  ]));
test('中国建设银行信用卡退款', () =>
  testAnkio('中国建设银行信用卡退款', [
    {
      "type": "Income",
      "money": 74.26,
      "fee": 0,
      "shopName": '',
      "shopItem": '消费退款/退税',
      "accountNameFrom": '中国建设银行信用卡(4243)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年05月27日02时16分', 'Y年M月D日h时i分'),
      "channel": '微信[中国建设银行信用卡-收入]',
    },
  ]));
test('中国建设银行信用卡还款', () =>
  testAnkio('中国建设银行信用卡还款', [
    {
      "type": "Transfer",
      "money": 4659.66,
      "fee": 0,
      "shopName": '',
      "shopItem": '信用卡一键还款',
      "accountNameFrom": '',
      "accountNameTo": '中国建设银行信用卡',
      "currency": 'CNY',
      "time": formatDate('10月1日 15时51分', 'M月D日 h时i分'),
      "channel": '微信[中国建设银行信用卡-还款]',
    },
  ]));
