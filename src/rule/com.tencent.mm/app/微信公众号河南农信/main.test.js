const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('河南农信入账', () =>
  testAnkio('河南农信入账', [
    {
      "type": "Income",
      "money": 2564.2,
      "fee": 0,
      "shopName": '',
      "shopItem": '代发入账',
      "accountNameFrom": '河南农信(1183)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年11月09日13时00分', 'Y年M月D日h时i分'),
      "channel": '微信[河南农信-交易]',
    },
  ]));
