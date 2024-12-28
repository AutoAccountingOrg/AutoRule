
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
      'shopName': '网上支付',
      'shopItem': '财付通，微信支付-京东商城平台商户',
      "accountNameFrom": '农业银行信用卡(5981)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-05-26 20:09:20', 'Y-M-D h:i:s'),
      'channel': '微信[农业银行信用卡-支出]'
    },
    {
      'type': 'Expend',
      'money': 2,
      'fee': 0,
      'shopName': '网上支付',
      'shopItem': '杭州兑吧网络科技有限公司',
      'accountNameFrom': '农业银行信用卡(8487)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-12-02 08:21:01', 'Y-M-D h:i:s'),
      'channel': '微信[农业银行信用卡-支出]'
    },
    {
      'type': 'Expend',
      'money': 505,
      'fee': 0,
      'shopName': '消费',
      'shopItem': '上海秋实企业管理有限公司',
      'accountNameFrom': '农业银行信用卡(8487)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-12-09 11:54:03', 'Y-M-D h:i:s'),
      'channel': '微信[农业银行信用卡-支出]'
    }
  ]));



test("农业银行信用卡刷卡金返现", () =>
  testAnkio('农业银行信用卡刷卡金返现', [
    {
      "type": "Income",
      "money": 0.3,
      "fee": 0,
      'shopName': '刷卡金转入',
      'shopItem': '天天返现,消费时间11/21,09:15',
      "accountNameFrom": '农业银行信用卡(8487)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-11-21 09:15:06', 'Y-M-D h:i:s'),
      'channel': '微信[农业银行信用卡-收入]'
    }
  ]));

test('农业银行信用卡退款', () =>
  testAnkio('农业银行信用卡退款', [
    {
      "type": "Income",
      "money": 17.67,
      "fee": 0,
      'shopName': '退货',
      "shopItem": "多多支付退款",
      "accountNameFrom": "农业银行信用卡(6395)",
      "accountNameTo": "",
      "currency": "CNY",
      "time": formatDate('2024-12-02 12:32:19', 'Y-M-D h:i:s'),
      'channel': '微信[农业银行信用卡-收入]'
    }
  ]));
