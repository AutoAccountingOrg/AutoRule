const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信支付扫码付款', () =>
  testAnkio('微信支付扫码付款', [
    {
      "type": "Expend",
      "money": 10,
      "fee": 0,
      "shopName": '开心快乐每一天',
      "shopItem": '付款给开心快乐每一天(**财)',
      "accountNameFrom": '徽商银行储蓄卡',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-付款]',
    },
    {
      "type": "Expend",
      "money": 70,
      "fee": 0,
      "shopName": '酱骨头焖面',
      "shopItem": '付款给酱骨头焖面(**强)',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-付款]',
    },
    {
      "type": "Expend",
      "money": 9,
      "fee": 0,
      "shopName": '川香源',
      "shopItem": '付款给川香源(**挥)',
      "accountNameFrom": '零钱通',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-付款]',
    },
    {
      "type": "Expend",
      "money": 5,
      "fee": 0,
      "shopName": '发财',
      "shopItem": '面对面红包',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1727788529055,
      "channel": '微信[微信支付-付款]',
    },
    {
      "type": "Expend",
      "money": 17.3,
      "fee": 0,
      "shopName": '冰达4386马金峰',
      "shopItem": '宁A·T4386',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1731045490128,
      "channel": '微信[微信支付-付款]',
    },
  ]));
