const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('京东支付消费', () =>
  testAnkio('京东支付消费', [
    {
      'type': 'Expend',
      'money': 25.2,
      'fee': 0,
      'shopName': '京东平台商户',
      'shopItem': '',
      'accountNameFrom': '招行信用卡(尾号1356)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-05-02 18:58:44', 'Y-M-D h:i:s'),
      'channel': '微信[京东支付-消费]'
    },
    {
      'type': 'Expend',
      'money': 23.9,
      'fee': 0,
      'shopName': '京东平台商户',
      'shopItem': '',
      'accountNameFrom': '招行信用卡(尾号1356)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-05-12 15:45:36', 'Y-M-D h:i:s'),
      'channel': '微信[京东支付-消费]'
    },
    {
      'type': 'Expend',
      'money': 17.03,
      'fee': 0,
      'shopName': '京东平台商户',
      'shopItem': '',
      'accountNameFrom': '江苏银行信用卡(尾号6706)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024-06-13 07:38:27', 'Y-M-D h:i:s'),
      'channel': '微信[京东支付-消费]'
    }
  ]));
