const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { formatDate } = require('../../../../utils/Time');

testAnkioInit(get, __dirname, DataType.App, 'com.tencent.mm');

test('中国建设银行收入', () =>
  testAnkio('中国建设银行收入', [
    {
      type: 1,
      money: 100,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '中国建设银行储蓄卡(5926)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('2024年5月8日 00:56:08', 'Y年M月D日 h:i:s'),
      channel: '微信[中国建设银行-收入]',
    },
    {
      type: 1,
      money: 23.6,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '中国建设银行储蓄卡(4053)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('2024年5月7日 22:30:39', 'Y年M月D日 h:i:s'),
      channel: '微信[中国建设银行-收入]',
    },
  ]));
test('中国建设银行支出', () =>
  testAnkio('中国建设银行支出', [
    {
      type: 0,
      money: 15.8,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '中国建设银行储蓄卡(4053)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('2024年5月7日 20:24:29', 'Y年M月D日 h:i:s'),
      channel: '微信[中国建设银行-支出]',
    },
  ]));
test('中国建设银行信用卡支出', () =>
  testAnkio('中国建设银行信用卡支出', [
    {
      type: 0,
      money: 29.9,
      fee: 0,
      shopName: '',
      shopItem: '',
      accountNameFrom: '中国建设银行信用卡(8254)',
      accountNameTo: '',
      currency: 'CNY',
      time: formatDate('5月17日 17时52分', 'M月D日 h时i分'),
      channel: '微信[中国建设银行信用卡-支出]',
    },
  ]));
