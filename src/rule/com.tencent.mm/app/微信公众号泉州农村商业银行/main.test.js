const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('泉州农村商业银行', () =>
  testAnkio('泉州农村商业银行', [
    {
      "type": "Expend",
      "money": 0.01,
      "fee": 0,
      "shopName": '',
      "shopItem": 'WL财付通微信转账:微...',
      "accountNameFrom": '泉州农村商业银行(2467)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年06月16日 12时36分', 'Y年M月D日 h时i分'),
      "channel": '微信[泉州农村商业银行-消费]',
    },
  ]));
