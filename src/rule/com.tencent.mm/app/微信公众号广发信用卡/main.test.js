const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('广发信用卡支出', () =>
  testAnkio('广发信用卡支出', [
    {
      "type": 0,
      "money": 1275.68,
      "fee": 0,
      "shopName": '（特约）京东支付',
      "shopItem": '网银在线（北京）科技有',
      "accountNameFrom": '广发信用卡(4897)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('05月26日20:01', 'M月D日h:i'),
      "channel": '微信[广发信用卡-支出]',
    },
  ]));
test('广发信用卡退款', () =>
  testAnkio('广发信用卡退款', [
    {
      "type": 1,
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
