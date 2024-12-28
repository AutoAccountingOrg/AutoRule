const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
testAnkioInit(get, __dirname, 'com.tencent.mm');
test('微信支付在线支付', () =>
  testAnkio('微信支付在线支付', [
    {
      "type": "Expend",
      "money": 35.41,
      "fee": 0,
      "shopName": '京东',
      "shopItem": '',
      "accountNameFrom": '中国银行储蓄卡(7575)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-在线支付]',
    },
    {
      "type": "Expend",
      "money": 69,
      "fee": 0,
      "shopName": '淘宝平台商户',
      "shopItem": '',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-在线支付]',
    },
    {
      "type": "Expend",
      "money": 3900,
      "fee": 0,
      "shopName": '',
      "shopItem": '财付通支付科技有限公司',
      "accountNameFrom": '微信零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-在线支付]',
    },
    {
      "type": "Expend",
      "money": 13,
      "fee": 0,
      "shopName": '长沙市芙蓉区妍茂食品商行',
      "shopItem": '',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1733126691282,
      "channel": '微信[微信支付-在线支付]',
    },
    {
      'type': 'Expend',
      'money': 17.3,
      'fee': 0,
      'shopName': '冰达4386马金峰',
      'shopItem': '宁A·T4386',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1731045490128,
      'channel': '微信[微信支付-在线支付]'
    },
    {
      'type': 'Expend',
      'money': 65.17,
      'fee': 0,
      'shopName': '产地鲜友公司李锆',
      'shopItem': '',
      'accountNameFrom': '农业银行储蓄卡',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1734072461624,
      'channel': '微信[微信支付-在线支付]'
    }
  ]));
