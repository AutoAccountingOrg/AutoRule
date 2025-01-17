const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('荣基餐饮消费', () =>
  testAnkio('荣基餐饮消费', [
    {
      'type': 'Expend',
      'money': 17.69,
      'fee': 0,
      'shopName': '荣基快餐（流塘店）',
      'shopItem': '',
      'accountNameFrom': '荣基餐饮(5375)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025/01/16 19:36:57', 'Y/M/D h:i:s'),
      'channel': '微信[荣基餐饮-支出]'
    }
  ]));
