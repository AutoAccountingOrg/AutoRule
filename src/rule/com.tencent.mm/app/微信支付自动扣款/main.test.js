const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信支付自动扣费', () =>
  testAnkio('微信支付自动扣费', [
    {
      "type": "Expend",
      "money": 53.72,
      "fee": 0,
      "shopName": '滴滴出行',
      "shopItem": '先乘后付',
      "accountNameFrom": '零钱通',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-扣款]',
    },
    {
      "type": "Expend",
      "money": 51.7,
      "fee": 0,
      "shopName": '滴滴出行',
      "shopItem": '先乘后付',
      "accountNameFrom": '零钱通',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-扣款]',
    },
    {
      "type": "Expend",
      "money": 25,
      "fee": 0,
      "shopName": '迅雷超级会员微信自动续费',
      "shopItem":
        '你的深圳市迅雷网络技术有限公司账号（185*****230）扣费成功',
      "accountNameFrom": '中国银行储蓄卡(7575)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-扣款]',
    },
    {
      "type": "Expend",
      "money": 18.5,
      "fee": 0,
      "shopName": '腾讯王卡微信话费代扣',
      "shopItem": '你的江苏联通账号（19999xxxx）扣费成功',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-扣款]',
    },
    {
      "type": "Expend",
      "money": 19,
      "fee": 0,
      "shopName": 'Keep会员包月自动续费',
      "shopItem": '你的Keep账号（太公摘花）扣费成功',
      "accountNameFrom": '零钱',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-扣款]',
    },
    {
      "type": "Expend",
      "money": 4.5,
      "fee": 0,
      "shopName": '成都地铁微信免密支付',
      "shopItem": '5号线皇花园-6号线牛王庙',
      "accountNameFrom": '工商银行',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 0,
      "channel": '微信[微信支付-扣款]',
    },
  ]));
