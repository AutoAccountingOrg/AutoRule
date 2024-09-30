const { get } = require('./main');
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


test('工商银行入账', () =>
  testAnkio('工商银行入账', [
    {
      "type": "Income",
      "money": 100,
      "fee": 0,
      "shopName": '',
      "shopItem": '差旅费',
      "accountNameFrom": '中国工商银行借记卡(7091)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年9月23日11:31', 'Y年M月D日h:i'),
      "channel": '微信[中国工商银行借记卡-收入]',
    },
]));

test('工商银行出账', () =>
  testAnkio('工商银行出账', [
    {
      "type": "Expend",
      "money": 0.1,
      "fee": 0,
      "shopName": '',
      "shopItem": '充值财付通-微信零钱充值账户',
      "accountNameFrom": '中国工商银行借记卡(9821)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年9月19日07:56', 'Y年M月D日h:i'),
      "channel": '微信[中国工商银行借记卡-支出]',
    },
  ]));
