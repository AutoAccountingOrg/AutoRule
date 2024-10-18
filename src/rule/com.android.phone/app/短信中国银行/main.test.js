const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('中国银行信用卡支出', () =>
  testAnkio('中国银行信用卡支出', [
    {
      "type": "Expend",
      "money": 138.2,
      "fee": 0,
      "shopName": '钱袋宝',
      "shopItem": '',
      "accountNameFrom": '中国银行信用卡(6666)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("2024年10月05日","Y年M月D日"),
      "channel": '中国银行信用卡[消费]',
    },
  ]));
