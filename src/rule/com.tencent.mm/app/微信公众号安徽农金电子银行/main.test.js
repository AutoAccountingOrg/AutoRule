const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('安徽农金电子银行支出', () =>
  testAnkio('安徽农金电子银行支出', [
    {
      'type': 'Expend',
      'money': 100,
      'fee': 0,
      'shopName': '',
      'shopItem': '支出-协议支付',
      'accountNameFrom': '安徽农金电子银行(6217*9139)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年12月02日 11:23:27', 'Y年M月D日 h:i:s'),
      'channel': '微信[安徽农金电子银行-支出]'
    }

  ]));
