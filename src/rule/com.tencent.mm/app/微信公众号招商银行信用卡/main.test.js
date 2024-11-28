const { get } = require('./main');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('招商银行信用卡消费', () =>
  testAnkio('招商银行信用卡消费', [
    {
      "type": "Expend",
      "money": 34.69,
      "shopName": '美团',
      "shopItem": '牛约堡手(旭辉店)',
      "accountNameFrom": '招商银行信用卡(1356)',
      "accountNameTo": '',
      "fee": 0,
      "currency": 'CNY',
      "time": formatDate('04月11日18:05', 'M月D日h:i'),
      "channel": '微信[招商银行信用卡-消费]',
    },
    {
      "type": "Expend",
      "money": 19.68,
      "shopName": '美团',
      "shopItem": '奉天熏六记熏拌鸡架（马坡店）',
      "accountNameFrom": '招商银行信用卡(1356)',
      "accountNameTo": '',
      "fee": 0,
      "currency": 'CNY',
      "time": formatDate('04月12日10:53', 'M月D日h:i'),
      "channel": '微信[招商银行信用卡-消费]',
    },
    {
      "type": "Expend",
      "money": 200.5,
      "shopName": '网上国网',
      "shopItem": '',
      "accountNameFrom": '招商银行信用卡(8995)',
      "accountNameTo": '',
      "fee": 0,
      "currency": 'CNY',
      "time": formatDate('10月07日01:56', 'M月D日h:i'),
      "channel": '微信[招商银行信用卡-消费]',
    },
  ]));

test('招商银行信用卡还款', () =>
  testAnkio('招商银行信用卡还款', [
    {
      "type": "Transfer",
      "money": 324.25,
      "shopName": '',
      "shopItem": '',
      "accountNameTo": '招商银行信用卡',
      "accountNameFrom": '招商银行信用卡自动还款账户',
      "fee": 0,
      "currency": 'CNY',
      "time": formatDate('2024年04月13日17:11:44', 'Y年M月D日h:i:s'),
      "channel": '微信[招商银行信用卡-还款]',
    },
    {
      "type": "Transfer",
      "money": 3661.6,
      "shopName": '',
      "shopItem": '账单已还清',
      "accountNameTo": '招商银行信用卡',
      "accountNameFrom": '',
      "fee": 0,
      "currency": 'CNY',
      "time": formatDate('09月26日 12:20:40', 'M月D日 h:i:s'),
      "channel": '微信[招商银行信用卡-还款]',
    },
  ]));

test('招商银行信用卡退货', () =>
  testAnkio('招商银行信用卡退货', [
    {
      "type": "Income",
      "money": 52,
      "shopName": '美团',
      "shopItem": '美团特约商户',
      "accountNameTo": '',
      "accountNameFrom": '招商银行信用卡(0898)',
      "fee": 0,
      "currency": 'CNY',
      "time": formatDate('05月11日13:57', 'M月D日h:i'),
      "channel": '微信[招商银行信用卡-退货]',
    },
    {
      "type": "Income",
      "money": 0.07,
      "shopName": '京东支付',
      "shopItem": '京东商城业务',
      "accountNameTo": '',
      "accountNameFrom": '招商银行信用卡(1356)',
      "fee": 0,
      "currency": 'CNY',
      "time": formatDate('05月12日09:57', 'M月D日h:i'),
      "channel": '微信[招商银行信用卡-退货]',
    },
    {
      "type": "Income",
      "money": 100,
      "shopName": '支付宝',
      "shopItem": '潮很鲜潮汕牛肉火锅',
      "accountNameTo": '',
      "accountNameFrom": '招商银行信用卡(2223)',
      "fee": 0,
      "currency": 'CNY',
      "time": formatDate('05月19日13:04', 'M月D日h:i'),
      "channel": '微信[招商银行信用卡-退货]',
    },
  ]));
