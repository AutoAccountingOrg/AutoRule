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
      "accountNameFrom": '',
      "accountNameTo": '工商银行(1234)',
      "currency": 'CNY',
      "time": formatDate("9月27日18:55","M月D日h:i"),
      "channel": '工商银行[支出]',
    },
  ]));
