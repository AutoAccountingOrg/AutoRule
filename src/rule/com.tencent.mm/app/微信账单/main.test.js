
const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信支付在线支付', () =>
  testAnkio('微信支付在线支付', [
    {
      'type': 'Expend',
      'money': 1.00,
      'fee': 0,
      'shopName': '杭州深度求索人工智能基础技术研究有限公司',
      'shopItem': '普通充值',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1733816116000,
      'channel': '微信[账单-支出]'
    }
  ]));

test('微信零钱提现', () =>
  testAnkio('微信零钱提现', [
    {
      'type': 'Transfer',
      'money': 278.77,
      'fee': 0,
      'shopName': '零钱提现',
      'shopItem': '到工商银行(9301)',
      'accountNameFrom': '微信零钱',
      'accountNameTo': '工商银行',
      'currency': 'CNY',
      'time': 1735818828000,
      'channel': '微信[账单-提现]'
    }
  ]));
