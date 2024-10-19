const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('广发信用卡支出', () =>
  testAnkio('广发信用卡支出', [
    {
      "type": "Expend",
      "money": 1275.68,
      "fee": 0,
      "shopName": '（特约）京东支付-网银在线（北京）科技有',
      "shopItem": '',
      "accountNameFrom": '广发信用卡(4897)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('05月26日20:01', 'M月D日h:i'),
      "channel": '微信[广发信用卡-支出]',
    },
    {
      "type": "Expend",
      "money": 2.39,
      "fee": 0,
      "shopName": '（特约）美团',
      "shopItem": '',
      "accountNameFrom": '广发信用卡(4542)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('05月28日18:26', 'M月D日h:i'),
      "channel": '微信[广发信用卡-支出]',
    },
  ]));

test('广发信用卡退款', () =>
  testAnkio('广发信用卡退款', [
    {
      "type": "Income",
      "money": 1275.68,
      "fee": 0,
      "shopName": '',
      "shopItem": '',
      "accountNameFrom": '广发信用卡(4897)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('05月26日20:06', 'M月D日h:i'),
      "channel": '微信[广发信用卡-退款]',
    },
  ]));

test('广发信用卡还款', () =>
  testAnkio('广发信用卡还款', [
    {
      "type": "Transfer",
      "money": 300,
      "fee": 0,
      "shopName": '发现精彩转账还款',
      "shopItem": '',
      "accountNameFrom": '发现精彩转账还款',
      "accountNameTo": '广发信用卡(1976)',
      "currency": 'CNY',
      "time": formatDate('10月16日00:12', 'M月D日h:i'),
      "channel": '微信[广发信用卡-还款]',
    },
  ]));
test('广发信用卡收入', () =>
  testAnkio('广发信用卡收入', [
    {
      "type": "Income",
      "money": 100,
      "fee": 0,
      "shopName": '',
      "shopItem": '消费达标20%加油返还',
      "accountNameFrom": '广发信用卡(2282)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1728867733714,
      "channel": '微信[广发信用卡-收入]',
    },
  ]));
