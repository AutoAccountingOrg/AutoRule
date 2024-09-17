const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('工商银行信用卡支出', () =>
  testAnkio('工商银行信用卡支出', [
    {
      "type": "Expend",
      "money": 1281.56,
      "fee": 0,
      "shopName": '消费财付通-京东商城平台商户',
      "shopItem": '',
      "accountNameFrom": '中国工商银行信用卡(0849)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年5月26日20:12', 'Y年M月D日h:i'),
      "channel": '微信[中国工商银行信用卡-支出]',
    },
    {
      "type": "Expend",
      "money": 427.14,
      "fee": 0,
      "shopName": '跨行消费',
      "shopItem": '',
      "accountNameFrom": '中国工商银行信用卡(0849)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年6月3日23:58', 'Y年M月D日h:i'),
      "channel": '微信[中国工商银行信用卡-支出]',
    },
  ]));
