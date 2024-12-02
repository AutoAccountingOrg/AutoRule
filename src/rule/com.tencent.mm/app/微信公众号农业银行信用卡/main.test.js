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

test('农业银行信用卡支出2', () =>
  testAnkio('农业银行信用卡支出2', [
    {
      "type": "Expend",
      "money": 2.00,
      "fee": 0,
      "shopName": "杭州兑吧网络科技有限公司",
      "shopItem": "杭州兑吧网络科技有限公司",
      "accountNameFrom": "农业银行信用卡(8487)",
      "accountNameTo": "",
      "currency": "CNY",
      "time": formatDate('2024-12-02 08:21:01', 'Y-M-D h:i:s'),
      "channel": "杭州兑吧网络科技有限公司[农业银行信用卡-消费]"
    }
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

test('农业银行信用卡退款', () =>
  testAnkio('农业银行信用卡退款', [
    {
      "type": "Income",
      "money": 17.67,
      "fee": 0,
      "shopName": "多多支付退款",
      "shopItem": "多多支付退款",
      "accountNameFrom": "农业银行信用卡(6395)",
      "accountNameTo": "",
      "currency": "CNY",
      "time": formatDate('2024-12-02 12:32:19', 'Y-M-D h:i:s'),
      "channel": "退款[农业银行信用卡-收入]"
    }
  ]));