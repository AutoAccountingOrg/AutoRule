const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('华夏银行信用卡支出', () =>
  testAnkio('华夏银行信用卡支出', [
    {
      "type": "Expend",
      "money": 29.97,
      "fee": 0,
      "shopName": '中国移动',
      "shopItem": '可用额度31955.11元，分期3折起！',
      "accountNameFrom": '华夏银行信用卡(3838)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年10月10日 11:01', 'Y年M月D日 h:i'),
      'channel': '微信[华夏银行信用卡-支出]'
    },
  ]));
