
const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');
testAnkioInit(get, __dirname, 'com.android.phone');
test('中国农业银行收入', () =>
  testAnkio('中国农业银行收入', [
    {
      "type": "Income",
      "money": 12000,
      "fee": 0,
      "shopName": '',
      "shopItem": '公积金付',
      "accountNameFrom": '中国农业银行(6666)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("09月27日09时15分",'M月D日h时i分'),
      "channel": '中国农业银行[收入]',
    },
    {
      'type': 'Income',
      'money': 60000,
      'fee': 0,
      'shopName': '苟先生',
      'shopItem': '转存',
      'accountNameFrom': '中国农业银行(2473)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('12月23日10:28', 'M月D日h:i'),
      'channel': '中国农业银行[收入]'
    }
  ]));
test('中国农业银行支出', () =>
  testAnkio('中国农业银行支出', [
    {
      "type": "Expend",
      "money": 18.9,
      "fee": 0,
      "shopName": '支付宝',
      "shopItem": '湖北良品铺子电子商务有限公司',
      "accountNameFrom": '中国农业银行(0773)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("10月06日15:03",'M月D日h:i'),
      "channel": '中国农业银行[支出]',
    },
    {
      "type": "Expend",
      "money": 400,
      "fee": 0,
      "shopName": '',
      "shopItem": '消费',
      "accountNameFrom": '中国农业银行(2666)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": formatDate("11月18日13时03分",'M月D日h时i分'),
      "channel": '中国农业银行[支出]',
    }
  ]));

test('中国农业银行信用卡消费', () =>
  testAnkio('中国农业银行信用卡消费', [
      {
        'type': 'Expend',
        'money': 27.4,
        'fee': 0,
        'shopName': '',
        'shopItem': '消费',
        'accountNameFrom': '中国农业银行(6559)',
        'accountNameTo': '',
        'currency': 'CNY',
        'time': formatDate('12月20日20:01', 'M月D日h:i'),
        'channel': '中国农业银行[支出]'
      }
    ]
  ));
