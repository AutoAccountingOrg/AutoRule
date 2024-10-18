const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('工商银行支出', () =>
  testAnkio('工商银行支出', [
    {
      "type": "Expend",
      "money": 45,
      "fee": 0,
      "shopName": '消费支付宝-北京三快在线科技有限公司',
      "shopItem": '',
      "accountNameFrom": '工商银行(1234)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("9月27日18:55","M月D日h:i"),
      "channel": '工商银行[支出]',
    },
  ]));
test('工商银行收入', () =>
  testAnkio('工商银行收入', [
    {
      "type": "Income",
      "money": 6.7,
      "fee": 0,
      "shopName": '微信零钱提现财付通',
      "shopItem": '',
      "accountNameFrom": '工商银行(1234)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("10月9日19:12","M月D日h:i"),
      "channel": '工商银行[收入]',
    },
  ]));
test('工商银行ETC支出', () =>
  testAnkio('工商银行ETC支出', [
    {
      "type": "Expend",
      "money": 103.55,
      "fee": 0,
      "shopName": '福建高速ETC',
      "shopItem": '福建龙岩铁山站驶入至福建南安梅山站驶出共计通行1次高速公路',
      "accountNameFrom": '工商银行(7246)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("2024年09月26日","Y年M月D日"),
      "channel": '工商银行[ETC支出]',
    },
  ]));

