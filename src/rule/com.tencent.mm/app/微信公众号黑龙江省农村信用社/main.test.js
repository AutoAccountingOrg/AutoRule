const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('黑龙江省农村信用社存入', () =>
  testAnkio('黑龙江省农村信用社存入', [
    {
      "type": "Income",
      "money": 100,
      "fee": 0,
      "shopName": '',
      "shopItem": '转账存入',
      "accountNameFrom": '黑龙江省农村信用社',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-10-29 14:02:21', 'Y-M-D h:i:s'),
      "channel": '微信[黑龙江省农村信用社-交易]',
    },
  ]));
