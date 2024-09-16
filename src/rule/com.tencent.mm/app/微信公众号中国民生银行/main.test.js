const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('民生银行收入', () =>
  testAnkio('民生银行收入', [
    {
      "type": "Income",
      "money": 14214.2,
      "fee": 0,
      "shopName": '西安隆基乐叶光伏科技有限公司',
      "shopItem": '工资',
      "accountNameFrom": '中国民生银行借记卡(6510)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年05月10日 09:34:47', 'Y年M月D日 h:i:s'),
      "channel": '微信[中国民生银行-收入]',
    },
  ]));

test('民生银行支出', () =>
  testAnkio('民生银行支出', [
    {
      "type": "Expend",
      "money": 0.01,
      "fee": 0,
      "shopName": '微信转账',
      "shopItem": '财付通-快捷支付-微信转账',
      "accountNameFrom": '中国民生银行借记卡(6510)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年05月10日 22:24:38', 'Y年M月D日 h:i:s'),
      "channel": '微信[中国民生银行-支出]',
    },
  ]));
