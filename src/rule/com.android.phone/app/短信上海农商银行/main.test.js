
const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('上海农商银行支出', () =>
  testAnkio('上海农商银行支出', [
    {
      'type': 'Expend',
      'money': 1118,
      'fee': 0,
      'shopName': '',
      'shopItem': '汇款转出',
      'accountNameFrom': '上海农商银行(8162)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月6日10:39', 'M月D日h:i'),
      'channel': '上海农商银行[支出]'
    }
  ]));

test('上海农商银行收入', () =>
  testAnkio('上海农商银行收入', [
    {
      'type': 'Income',
      'money': 304,
      'fee': 0,
      'shopName': '上海虹口区江湾镇社区服务管理中心',
      'shopItem': '行内转账转入',
      'accountNameFrom': '上海农商银行(8162)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('1月2日10:57', 'M月D日h:i'),
      'channel': '上海农商银行[收入]'
    }
  ]));
