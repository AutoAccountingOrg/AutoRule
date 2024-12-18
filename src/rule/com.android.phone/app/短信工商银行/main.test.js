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
      "shopName": '消费支付宝',
      "shopItem": '北京三快在线科技有限公司',
      "accountNameFrom": '工商银行(1234)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("9月27日18:55","M月D日h:i"),
      "channel": '工商银行[支出]',
    },
    {
      "type": "Expend",
      "money": 4.78,
      "fee": 0,
      "shopName": '',
      "shopItem": '无卡支付',
      "accountNameFrom": '工商银行(1234)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("10月14日23:41","M月D日h:i"),
      "channel": '工商银行[网上银行支出]',
    },
    {
      "type": "Expend",
      "money": 28.1,
      "fee": 0,
      "shopName": '消费支付宝',
      "shopItem": '严',
      "accountNameFrom": '工商银行(5537)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("11月11日12:39","M月D日h:i"),
      "channel": '工商银行[支出]',
    },
  ]));
test('工商银行收入', () =>
  testAnkio('工商银行收入', [
    {
      "type": "Income",
      "money": 6.7,
      "fee": 0,
      "shopName": '',
      "shopItem": '微信零钱提现财付通',
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
    {
      "type": "Expend",
      "money": 63.65,
      "fee": 0,
      "shopName": '****6V2',
      "shopItem": '在天津茶淀镇收费站驶入，至北京北京京津台湖主站驶出',
      "accountNameFrom": '工商银行ETC',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("2024-10-14","Y-M-D"),
      "channel": '工商银行[ETC支出]',
    },
  ]));

