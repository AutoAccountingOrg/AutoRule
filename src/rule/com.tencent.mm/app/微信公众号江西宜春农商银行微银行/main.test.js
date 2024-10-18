const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('支出', () =>
  testAnkio('支出', [
    {
      "type": "Expend",
      "money": 500,
      "fee": 0,
      "shopName": '',
      "shopItem": '超级网银往贷-转出-张三',
      "accountNameFrom": '江西宜春农商银行',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年10月13日 08:43:11', 'Y年M月D日 h:i:s'),
      "channel": '微信[江西宜春农商银行微银行-支出]',
    },
  ]));
