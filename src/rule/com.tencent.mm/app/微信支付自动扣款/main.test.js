const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('微信支付自动扣费', () =>
  testAnkio('微信支付自动扣费', [
    {
      'type': 'Expend',
      'money': 53.72,
      'fee': 0,
      'shopName': '滴滴出行',
      'shopItem': '先乘后付',
      'accountNameFrom': '零钱通',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 51.7,
      'fee': 0,
      'shopName': '滴滴出行',
      'shopItem': '先乘后付',
      'accountNameFrom': '零钱通',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 25,
      'fee': 0,
      'shopName': '迅雷超级会员微信自动续费',
      'shopItem':
        '你的深圳市迅雷网络技术有限公司账号（185*****230）扣费成功',
      'accountNameFrom': '中国银行储蓄卡(7575)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 18.5,
      'fee': 0,
      'shopName': '腾讯王卡微信话费代扣',
      'shopItem': '你的江苏联通账号（19999xxxx）扣费成功',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 19,
      'fee': 0,
      'shopName': 'Keep会员包月自动续费',
      'shopItem': '你的Keep账号（太公摘花）扣费成功',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 4.5,
      'fee': 0,
      'shopName': '成都地铁微信免密支付',
      'shopItem': '5号线皇花园-6号线牛王庙',
      'accountNameFrom': '工商银行',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 1.8,
      'fee': 0,
      'shopName': '长春地区公交微信免密支付',
      'shopItem': '你在长春市科云科技有限公司的账号199****0759扣费成功',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 0,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 35.82,
      'fee': 0,
      'shopName': '湖南电信话费自动缴费',
      'shopItem': '你的中国电信湖南网厅账号（19314326581）扣费成功',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1727808197266,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 98.5,
      'fee': 0,
      'shopName': '腾讯王卡微信话费代扣',
      'shopItem': '你的江苏联通账号（1273747744）续费成功',
      'accountNameFrom': '零钱',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1732594766650,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 26.7,
      'fee': 0,
      'shopName': '拼多多订单免密支付',
      'shopItem': '你的拼多多平台商户账号（～水）扣费成功',
      'accountNameFrom': '零钱通',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1734775611530,
      'channel': '微信[微信支付-自动扣费]'
    },
    {
      'type': 'Expend',
      'money': 22,
      'fee': 0,
      'shopName': '上海交通大学免密支付',
      'shopItem': '闵行四餐食尚卤',
      'accountNameFrom': '零钱通',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': 1733822307961,
      'channel': '微信[微信支付-自动扣费]'
    }
  ]));
