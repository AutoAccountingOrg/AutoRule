const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('农业银行信用卡支出', () =>
  testAnkio('农业银行信用卡支出', [
    {
      "type": "Expend",
      "money": 1281.56,
      "fee": 0,
      "shopName": '财付通',
      "shopItem": '微信支付-京东商城平台商户',
      "accountNameFrom": '农业银行信用卡(5981)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-05-26 20:09:20', 'Y-M-D h:i:s'),
      "channel": '财付通[农业银行信用卡-消费]',
    },
  ]));

test("农业银行信用卡刷卡金返现", () =>
  testAnkio('农业银行信用卡刷卡金返现', [
    {
      "type": "Income",
      "money": 0.3,
      "fee": 0,
      "shopName": '农业银行信用卡',
      "shopItem": '天天返现',
      "accountNameFrom": '农业银行信用卡(8487)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-11-21 09:15:06', 'Y-M-D h:i:s'),
      "channel": '刷卡金返现[农业银行信用卡-收入]'
    }
    ]));
