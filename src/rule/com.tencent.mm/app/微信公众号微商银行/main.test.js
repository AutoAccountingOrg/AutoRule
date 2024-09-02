const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('微商银行消费', () =>
  testAnkio('微商银行消费', [
    {
      "type": 0,
      "money": 66.66,
      "fee": 0,
      "shopName": '',
      "shopItem": '财付通',
      "accountNameFrom": '徽商借记卡(3449)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('04月18日 17:25:47', 'M月D日 h:i:s'),
      "channel": '微信[徽商银行-消费]',
    },
    {
      "type": 0,
      "money": 10,
      "fee": 0,
      "shopName": '',
      "shopItem": '财付通',
      "accountNameFrom": '徽商借记卡(3449)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('05月06日 12:09:34', 'M月D日 h:i:s'),
      "channel": '微信[徽商银行-消费]',
    },
  ]));
test('微商银行退款', () =>
  testAnkio('微商银行退款', [
    {
      "type": 1,
      "money": 39.9,
      "fee": 0,
      "shopName": '',
      "shopItem": '退款',
      "accountNameFrom": '徽商借记卡(3449)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('05月06日 17:04:10', 'M月D日 h:i:s'),
      "channel": '微信[徽商银行-退款]',
    },
  ]));
