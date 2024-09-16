const { get } = require('./main');

const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');
testAnkioInit(get, __dirname, 'com.tencent.mm');
test('收钱吧消费通知', () =>
  testAnkio('收钱吧消费通知', [
    {
      "type": 0,
      "money": 2.0,
      "shopName": '三津汤包雅雀湖店',
      "shopItem": '门店收款',
      "accountNameFrom": '',
      "accountNameTo": '',
      "fee": 0,
      "currency": 'CNY',
      "time": formatDate(),
      "channel": '微信[收钱吧消费通知]',
    },
  ]));
