const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('中国银行入账', () =>
  testAnkio('中国银行入账', [
    {
      "type": 1,
      "money": 14800.0,
      "fee": 0,
      "shopName": '',
      "shopItem": '银联入账',
      "accountNameFrom": '中国银行(7575)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('04月12日18:12', 'M月D日h:i'),
      "channel": '微信[中国银行-入账]',
    },
  ]));

test('中国银行退款', () =>
  testAnkio('中国银行退款', [
    {
      "type": 1,
      "money": 1000.0,
      "fee": 0,
      "shopName": '',
      "shopItem": '网上快捷退款',
      "accountNameFrom": '中国银行(7575)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('04月13日13:02', 'M月D日h:i'),
      "channel": '微信[中国银行-退款]',
    },
  ]));

test('中国银行消费', () =>
  testAnkio('中国银行消费', [
    {
      "type": 0,
      "money": 1000,
      "fee": 0,
      "shopName": '',
      "shopItem": '网上快捷支付',
      "accountNameFrom": '中国银行(7575)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('04月13日13:02', 'M月D日h:i'),
      "channel": '微信[中国银行-消费]',
    },
    {
      "type": 0,
      "money": 31.78,
      "fee": 0,
      "shopName": '',
      "shopItem": '网上快捷支付',
      "accountNameFrom": '中国银行(7575)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('04月12日18:28', 'M月D日h:i'),
      "channel": '微信[中国银行-消费]',
    },
    {
      "type": 0,
      "money": 1000,
      "fee": 0,
      "shopName": '',
      "shopItem": '网上快捷支付',
      "accountNameFrom": '中国银行(7575)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('04月14日14:02', 'M月D日h:i'),
      "channel": '微信[中国银行-消费]',
    },
    {
      "type": 0,
      "money": 30,
      "fee": 0,
      "shopName": '',
      "shopItem": '网上快捷支付',
      "accountNameFrom": '中国银行(0464)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('04月12日19:04', 'M月D日h:i'),
      "channel": '微信[中国银行-消费]',
    },
    {
      "type": 0,
      "money": 5,
      "fee": 0,
      "shopName": '',
      "shopItem": 'POS消费',
      "accountNameFrom": '中国银行(0464)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('05月08日00:34', 'M月D日h:i'),
      "channel": '微信[中国银行-消费]',
    },
    {
      "type": 0,
      "money": 1,
      "fee": 0,
      "shopName": '',
      "shopItem": 'POS消费',
      "accountNameFrom": '中国银行(4193)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('05月24日17:45', 'M月D日h:i'),
      "channel": '微信[中国银行-消费]',
    },
  ]));
test('中国银行信用卡存入', () =>
  testAnkio('中国银行信用卡存入', [
    {
      "type": 1,
      "money": 357,
      "fee": 0,
      "shopName": '',
      "shopItem": '存入',
      "accountNameFrom": '中国银行信用卡(5248)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('05月16日11:05', 'M月D日h:i'),
      "channel": '微信[中国银行信用卡-存入]',
    },
  ]));
