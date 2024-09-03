const { get } = require('./main');

const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');

testAnkioInit(get, __dirname, DataType.App, 'com.eg.android.AlipayGphone');
test('支付宝收款码收款', () =>
  testAnkio('支付宝收款码收款', [
    {
      "type": 1,
      "money": 0.01,
      "fee": 0,
      "shopName": '**江',
      "shopItem": '商品',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1703055625000,
      "channel": '支付宝[收钱码收款]',
    },
  ]));

test('支付宝收钱码服务费', () =>
  testAnkio('支付宝收钱码服务费', [
    {
      "type": 0,
      "money": 9.5,
      "fee": 0,
      "shopName": '支付宝(中国)网络技术有限公司',
      "shopItem": '收钱码经营版信用卡收钱服务费[2024011022001425671431559132]',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1704854659000,
      "channel": '支付宝[收钱码服务费]',
    },
  ]));

test('支付宝转账收款', () =>
  testAnkio('支付宝转账收款', [
    {
      "type": 1, // 0为支出，1为收入，2为转账
      "money": 0.01,
      "fee": 0,
      "shopName": '从前慢',
      "shopItem": '转账',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1710075615000,
      "channel": '支付宝[转账收款]',
    },
  ]));

test('支付宝余额转到余额宝', () =>
  testAnkio('支付宝余额转到余额宝', [
    {
      "type": 2,
      "money": 0.01,
      "fee": 0,
      "shopName": '余额宝',
      "shopItem": '转账收款到余额宝',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '余额宝',
      "currency": 'CNY',
      "time": 1710046787000,
      "channel": '支付宝[余额宝转账]',
    },
    {
      "type": 2,
      "money": 0.01,
      "fee": 0,
      "shopName": '余额宝',
      "shopItem": '转账收款到余额宝',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '余额宝',
      "currency": 'CNY',
      "time": 1710075624000,
      "channel": '支付宝[余额宝转账]',
    },
  ]));

test('余额宝收益发放', () =>
  testAnkio('余额宝收益发放', [
    {
      "type": 1,
      "money": 0.01,
      "fee": 0,
      "shopName": '长城基金管理有限公司',
      "shopItem": '余额宝-2024.03.25-收益发放',
      "accountNameFrom": '余额宝',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1711393834000,
      "channel": '支付宝[余额宝收益]',
    },
  ]));
