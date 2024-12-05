const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('交通银行信用卡支出', () =>
  testAnkio('交通银行信用卡支出', [
    {
      "type": "Expend",
      "money": 10,
      "fee": 0,
      "shopName": '',
      "shopItem": '消费',
      "accountNameFrom": '交通银行信用卡(9354)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('2024年11月29日 11:03', 'Y年M月D日 h:i'),
      "channel": '微信[交通银行信用卡买单吧-支出]',
    },
  ]));

