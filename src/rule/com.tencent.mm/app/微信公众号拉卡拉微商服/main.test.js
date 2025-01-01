const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('拉卡拉微商服微信扫码消费', () =>
  testAnkio('拉卡拉微商服微信扫码消费', [
    {
      'type': 'Expend',
      'money': 2034.00,
      'fee': 0,
      'shopName': 'XXXX店铺',
      'shopItem': '订单类型：82211005399021G（B2433763）',
      'accountNameFrom': '微信，扫码消费（主扫）',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年01月01日 15:35:22', 'Y年M月D日 h:i:s'),
      'channel': '微信[拉卡拉微商服-扫码消费]'
    }
  ]));
