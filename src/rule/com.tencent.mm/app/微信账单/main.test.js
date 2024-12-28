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
