const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('招商银行消费', () =>
  testAnkio('招商银行消费', [
    {
      "type": "Expend",
      "money": 20,
      "fee": 0,
      "shopName": '财付通-微信支付',
      "shopItem": '群收款快捷支付扣款',
      "accountNameFrom": '招商银行(5157)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate('11月07日 11:50', 'M月D日 h:i'),
      "channel": '微信[招商银行-消费]',
    },

  ]));
