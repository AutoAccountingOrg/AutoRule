const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('光大���行信用卡消费', () =>
  testAnkio('光大银行信用卡消费', [
    {
      'type': 'Expend',
      'money': 10000,
      'fee': 0,
      'shopName': '财付通',
      'shopItem': '华强电子世界',
      'accountNameFrom': '光大银行信用卡(5338)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年11月25日 18:55', 'Y年M月D日 h:i'),
      'channel': '微信[光大银行信用卡-支出]'
    },
    {
      'type': 'Expend',
      'money': 100,
      'fee': 0,
      'shopName': '',
      'shopItem': '中国石化销售股份有限公司安徽石油',
      'accountNameFrom': '光大银行信用卡(7558)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('2024年12月18日 10:10', 'Y年M月D日 h:i'),
      'channel': '微信[光大银行信用卡-支出]'
    }
  ]));

test('光大银行信用卡还款', () =>
  testAnkio('光大银行信用卡还款', [
    {
      'type': 'Transfer',
      'money': 99.68,
      'fee': 0,
      'shopName': '',
      'shopItem': '',
      'accountNameFrom': '',
      'accountNameTo': '光大银行信用卡(7558)',
      'currency': 'CNY',
      'time': formatDate('2024年12月18日 09:10', 'Y年M月D日 h:i'),
      'channel': '微信[光大银行信用卡-还款]'
    }
  ]));
