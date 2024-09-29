const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('宁波银行收入', () =>
  testAnkio('宁波银行收入', [
    {
      "type": "Income",
      "money": 1696.49,
      "fee": 0,
      "shopName": '大夏公司',
      "shopItem": '工资',
      "accountNameFrom": '宁波银行(2582)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('09月15日 17:00', 'M月D日 h:i'),
      "channel": '微信[宁波银行-收入]',
    },
  ]));
test('宁波银行消费', () =>
  testAnkio('宁波银行消费', [
    {
      "type": "Expend",
      "money": 58.75,
      "fee": 0,
      "shopName": '拼多多平台商户',
      "shopItem": '网络支付消费',
      "accountNameFrom": '宁波银行(2582)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('09月16日 10:29', 'M月D日 h:i'),
      "channel": '微信[宁波银行-支出]',
    },
  ]));
