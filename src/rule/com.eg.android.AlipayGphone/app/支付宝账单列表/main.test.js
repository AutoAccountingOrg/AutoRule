const { get } = require('./main');

const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');


testAnkioInit(get, __dirname, 'com.eg.android.AlipayGphone');
test('支付宝普通交易', () =>
  testAnkio('支付宝普通交易', [
    {
      "type": "Income",
      "money": 0.01,
      "fee": 0,
      "shopName": '**江',
      "shopItem": '商品',
      "accountNameFrom": '支付宝余额',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1703055625000,
      "channel": '支付宝[普通交易]',
    },
    {
      "type": "Expend",
      "money": 40,
      "fee": 0,
      "shopName": '上海壹佰米网络科技有限公司',
      "shopItem": '叮咚买菜-2406084744529149231',
      "accountNameFrom": '中国银行储蓄卡(7575)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1717858508000,
      "channel": '支付宝[普通交易]',
    },
    {
      "type": "Expend",
      "money":  24.8,
      "fee": 0,
      "shopName": '小白**店',
      "shopItem": '【活动价】小白心里软爆浆鸡蛋仔早餐蛋糕整箱面包健康充饥零食夜宵小吃',
      "accountNameFrom": '农业银行储蓄卡(0773)',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1726382698000,
      "channel": '支付宝[普通交易]',
    },
    {
      "type": "Expend",
      "money":  21.8,
      "fee": 0,
      "shopName": '喷**',
      "shopItem": '',
      "accountNameFrom": '余额宝',
      "accountNameTo": '',
      "currency": 'CNY',
      "time": 1727714675000,
      "channel": '支付宝[普通交易]',
    },
  ]));

test('支付宝收钱码服务费', () =>
  testAnkio('支付宝收钱码服务费', [
    {
      "type": "Expend",
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
      "type": "Income", // 0为支出，1为收入，2为转账
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
      "type": "Transfer",
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
      "type": "Transfer",
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
      "type": "Income",
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
