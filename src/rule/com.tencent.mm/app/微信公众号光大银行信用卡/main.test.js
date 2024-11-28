const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('光大银行信用卡消费', () =>
  testAnkio('光大银行信用卡消费', [
    {
      "type": "Expend",
      "money": 10000,
      "fee": 0,
      "shopName": '财付通',
      "shopItem": '华强电子世界',
      "accountNameFrom": '光大银行信用卡(5338)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年11月25日 18:55', 'Y年M月D日 h:i'),
      "channel": '微信[光大银行信用卡-支出]',
    }
  ]));