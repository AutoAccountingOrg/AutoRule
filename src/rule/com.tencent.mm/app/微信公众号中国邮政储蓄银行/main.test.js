
const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('中国邮政储蓄银行收入', () =>
  testAnkio('中国邮政储蓄银行收入', [
    {
      'type': 'Income',
      'money': 8683.33,
      'fee': 0,
      'shopName': '',
      'shopItem': '薪酬',
      'accountNameFrom': '中国邮政储蓄银行(7618)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年06月14日23:19', 'Y年M月D日h:i'),
      'channel': '微信[中国邮政储蓄银行-收入]'
    }
  ]));
test('中国邮政储蓄银行支出', () =>
  testAnkio('中国邮政储蓄银行支出', [
    {
      'type': 'Expend',
      'money': 8000,
      'fee': 0,
      'shopName': '',
      'shopItem': '扣款',
      'accountNameFrom': '中国邮政储蓄银行(5476)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2025年01月03日07:21', 'Y年M月D日h:i'),
      'channel': '微信[中国邮政储蓄银行-支出]'
    },
    {
      'type': 'Expend',
      'money': 13.78,
      'fee': 0,
      'shopName': '',
      'shopItem': '银联快捷',
      'accountNameFrom': '中国邮政储蓄银行(8057)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年09月22日19:56', 'Y年M月D日h:i'),
      'channel': '微信[中国邮政储蓄银行-支出]'
    },
  ]));
