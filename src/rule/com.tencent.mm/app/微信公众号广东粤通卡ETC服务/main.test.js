const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');
test('高速通行通知', () =>
  testAnkio('高速通行通知', [
    {
      "type": "Expend",
      "money": 19.95,
      "fee": 0,
      "shopName": '车牌号:******',
      "shopItem": '入口站点:广东浸潭站\n出口站点:广东清新站',
      "accountNameFrom": '广东粤通卡ETC服务',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024-09-22 19:45:04', 'Y-M-D h:i:s'),
      "channel": '微信[广东粤通卡ETC服务]',
    },
  ]));
