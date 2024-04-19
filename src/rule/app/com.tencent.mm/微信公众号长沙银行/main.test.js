const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');
test('长沙银行支付宝支付取出', () =>
  testAnkio('长沙银行支付宝支付取出', [
    {
      type: 0,
      money: 200,
      fee: 0,
      shopName: '',
      shopItem: '中国电信股份有限公司全渠道运营中心-商品...',
      accountNameFrom: '长沙银行（2754）',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('04月10日09:03', 'M月D日h:i'),
      channel: '微信[长沙银行交易通知]',
    },
  ]));
