const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('交通银行收入', () =>
  testAnkio('交通银行收入', [
    {
      'type': 'Income',
      'money': 26028,
      'fee': 0,
      'shopName': '',
      'shopItem': '其他第三方交行转入',
      'accountNameFrom': '交通银行账户(3896)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-09-27 14:17', 'Y-M-D h:i'),
      'channel': '微信[交通银行微银行-收入]'
    },
    {
      'type': 'Income',
      'money': 6205.2,
      'fee': 0,
      'shopName': '电池材料有限公司',
      'shopItem': '跨行汇款转入',
      'accountNameFrom': '交通银行(4720)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年10月18日 10:43', 'Y年M月D日 h:i'),
      'channel': '微信[交通银行微银行-收入]'
    }
  ]));

test('交通银行支出', () =>
  testAnkio('交通银行支出', [
    {
      'type': 'Expend',
      'money': 22.6,
      'fee': 0,
      'shopName': '',
      'shopItem': '网络支付消费',
      'accountNameFrom': '交通银行账户(7237)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-09-25 11:03', 'Y-M-D h:i'),
      'channel': '微信[交通银行微银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 500,
      'fee': 0,
      'shopName': '',
      'shopItem': '支付平台快捷支付',
      'accountNameFrom': '交通银行账户(7237)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-10-09 08:31', 'Y-M-D h:i'),
      'channel': '微信[交通银行微银行-支出]'
    }
  ]));

test('交通银行信用卡还款', () =>
  testAnkio('交通银行信用卡还款', [
    {
      'type': 'Transfer',
      'money': 31604.21,
      'fee': 0,
      'shopName': '信用卡还款',
      'shopItem': '',
      'accountNameFrom': '交通银行(6662)',
      'accountNameTo': '交通银行信用卡',
      'currency': 'CNY',
      'time': formatDate('2024-12-12 06:21', 'Y-M-D h:i'),
      'channel': '微信[交通银行微银行-还款]'
    }
  ]));
