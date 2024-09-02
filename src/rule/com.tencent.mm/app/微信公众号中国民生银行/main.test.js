const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('民生银行收入', () =>
  testAnkio('民生银行收入', [
    {
      "type": 1,
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
      "type": 0,
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
