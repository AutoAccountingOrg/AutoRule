const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { DataType } = require('../../../../utils/DataType');
const { BillType } = require('../../../../utils/BillType');

testAnkioInit(get, __dirname, DataType.App, 'com.eg.android.AlipayGphone');
test('支付宝转账收款', () =>
  testAnkio('支付宝转账收款', [
    {
      type: 1,
      money: 0.01,
      fee: 0,
      shopName: '从前慢 185******30',
      shopItem: '收到一笔转账',
      accountNameFrom: '支付宝余额',
      accountNameTo: '',
      currency: 'CNY',
      time: 1697209372000,
      channel: '支付宝[转账收款]',
    },
  ]));

test('支付宝余额宝自动转入', () =>
  testAnkio('支付宝余额宝自动转入', [
    {
      type: 2,
      money: 0.01,
      fee: 0,
      shopName: '余额宝',
      shopItem: '转入成功',
      accountNameFrom: '支付宝余额',
      accountNameTo: '余额宝',
      currency: 'CNY',
      time: 1710075625000,
      channel: '支付宝[转账到余额宝]',
    },
    {
      type: 2,
      money: 161.49,
      fee: 0,
      shopName: '中欧基金管理有限公司',
      shopItem: '转入成功',
      accountNameFrom: '支付宝余额',
      accountNameTo: '余额宝',
      currency: 'CNY',
      time: 1716635215000,
      channel: '支付宝[转账到余额宝]',
    },
    {
      type: 2,
      money: 0.15,
      fee: 0,
      shopName: '中欧基金管理有限公司',
      shopItem: '转入成功',
      accountNameFrom: '支付宝余额',
      accountNameTo: '余额宝',
      currency: 'CNY',
      time: 1716292453000,
      channel: '支付宝[转账到余额宝]',
    },
  ]));

test('支付宝收款码收款', () =>
  testAnkio('支付宝收款码收款', [
    {
      type: 1,
      money: 0.01,
      fee: 0,
      shopName: '老顾客消费',
      shopItem: '今日第4笔收入，共计¥0.04',
      accountNameFrom: '支付宝余额',
      accountNameTo: '',
      currency: 'CNY',
      time: 1703056950000,
      channel: '支付宝[收款码收款]',
    },
  ]));
test('支付宝基金卖出', () =>
  testAnkio('支付宝基金卖出', [
    {
      type: 1,
      money: 37.97,
      fee: 0,
      shopName: '卖出产品',
      shopItem: '汇添富蓝筹稳健灵活配置混合A',
      accountNameFrom: '支付宝基金银行卡',
      accountNameTo: '',
      currency: 'CNY',
      time: 1715135058000,
      channel: '支付宝[基金卖出]',
    },
  ]));
test('支付宝发红包', () =>
  testAnkio('支付宝发红包', [
    {
      type: 0,
      money: 1,
      fee: 0,
      shopName: '支付宝红包',
      shopItem: '',
      accountNameFrom: '农业银行储蓄卡(9979)',
      accountNameTo: '',
      currency: 'CNY',
      time: 1710774326000,
      channel: '支付宝[发红包]',
    },
  ]));

test('支付宝消费', () =>
  testAnkio('支付宝消费', [
    {
      type: 0,
      money: 48.7,
      fee: 0,
      shopName: '饿了么',
      shopItem: '',
      accountNameFrom: '农业银行储蓄卡(9979)',
      accountNameTo: '',
      currency: 'CNY',
      time: 1710666718000,
      channel: '支付宝[消费]',
    },
    {
      type: 0,
      money: 183,
      fee: 0,
      shopName: '滴滴平台第三方油站',
      shopItem: '',
      accountNameFrom: '农业银行储蓄卡(9979)',
      accountNameTo: '',
      currency: 'CNY',
      time: 1710680143000,
      channel: '支付宝[消费]',
    },
    {
      type: 0,
      money: 169,
      fee: 0,
      shopName: '长沙新奥燃气发展有限公司',
      shopItem: '',
      accountNameFrom: '花呗',
      accountNameTo: '',
      currency: 'CNY',
      time: 1710655649000,
      channel: '支付宝[消费]',
    },
    {
      type: 0,
      money: 19.9,
      fee: 0,
      shopName: '广州市动景计算机科技有限公司',
      shopItem: '夸克网盘会员(月/季/年)',
      accountNameFrom: '长沙银行储蓄卡(2754)',
      accountNameTo: '',
      currency: 'CNY',
      time: 1712524722000,
      channel: '支付宝[消费]',
    },
    {
      type: 0,
      money: 1,
      fee: 0,
      shopName: '深圳壹基金公益基金会',
      shopItem: '',
      accountNameFrom: '余额宝',
      accountNameTo: '',
      currency: 'CNY',
      time: 1714961757000,
      channel: '支付宝[消费]',
    },
  ]));
test('支付宝消费奖励', () =>
  testAnkio('支付宝消费奖励', [
    {
      type: 1,
      money: 0.02,
      fee: 0,
      shopName: '吱信（上海）网络技术有限公司',
      shopItem: '支付宝发红包，你赚现金奖励',
      accountNameFrom: '支付宝余额',
      accountNameTo: '',
      currency: 'CNY',
      time: 1715479904000,
      channel: '支付宝[消费奖励]',
    },
    {
      type: 1,
      money: 0.22,
      fee: 0,
      shopName: '吱信（上海）网络技术有限公司',
      shopItem: '支付宝发红包，你赚现金奖励',
      accountNameFrom: '支付宝余额',
      accountNameTo: '',
      currency: 'CNY',
      time: 1715505776000,
      channel: '支付宝[消费奖励]',
    },
  ]));
test('支付宝退款', () =>
  testAnkio('支付宝退款', [
    {
      type: 1,
      money: 29.82,
      fee: 0,
      shopName: '上海拉扎斯信息科技有限公司',
      shopItem: '退款-麻爪爪·酸辣凤爪·卤味小吃(大朗里悦里店)外卖订单',
      accountNameFrom: '农业银行储蓄卡(9979)',
      accountNameTo: '',
      currency: 'CNY',
      time: 1710669984000,
      channel: '支付宝[退款]',
    },
    {
      type: 1,
      money: 21.74,
      fee: 0,
      shopName: '众安保险',
      shopItem: '保险承保-退保保费支付[24052031500657910793]',
      accountNameFrom: '花呗',
      accountNameTo: '',
      currency: 'CNY',
      time: 1716189364000,
      channel: '支付宝[退款]',
    },
  ]));

test('支付宝预授权消费', () =>
  testAnkio('支付宝预授权消费', [
    {
      type: 0,
      money: 3,
      fee: 0,
      shopName: '中国人民人寿保险股份有限公司',
      shopItem: '',
      accountNameFrom: '长沙银行储蓄卡(2754)',
      accountNameTo: '',
      currency: 'CNY',
      time: 1711441569000,
      channel: '支付宝[预授权消费]',
    },
  ]));

test('支付宝亲情卡消费', () =>
  testAnkio('支付宝亲情卡支付', [
    {
      type: 0,
      money: 55,
      fee: 0,
      shopName: '173******86(未实名)',
      shopItem: '付款成功',
      accountNameFrom: '北京银行信用购(原花呗)',
      accountNameTo: '',
      currency: 'CNY',
      time: 1712723745000,
      channel: '支付宝[亲情卡消费]',
    },
  ]));

test('支付宝余利宝收益', () =>
  testAnkio('支付宝余利宝收益', [
    {
      type: 1,
      money: 9.49,
      fee: 0,
      shopName: '余利宝',
      shopItem: '04-08你的余利宝收益已发放',
      accountNameFrom: '余利宝',
      accountNameTo: '',
      currency: 'CNY',
      time: 1712638021000,
      channel: '支付宝[余利宝收益]',
    },
    {
      type: 1,
      money: 3.16,
      fee: 0,
      shopName: '余利宝',
      shopItem: '04-10你的余利宝收益已发放',
      accountNameFrom: '余利宝',
      accountNameTo: '',
      currency: 'CNY',
      time: 1712805886000,
      channel: '支付宝[余利宝收益]',
    },
    {
      type: 1,
      money: 3.17,
      fee: 0,
      shopName: '余利宝',
      shopItem: '04-11你的余利宝收益已发放',
      accountNameFrom: '余利宝',
      accountNameTo: '',
      currency: 'CNY',
      time: 1712885083000,
      channel: '支付宝[余利宝收益]',
    },
  ]));

test('支付宝网商银行转出', () =>
  testAnkio('支付宝网商银行转出', [
    {
      type: 2,
      money: 20000,
      fee: 0,
      shopName: '网商银行',
      shopItem: '转账-转给江大 20000.00元',
      accountNameFrom: '网商银行(9370)',
      accountNameTo: '工商银行(8464)',
      currency: 'CNY',
      time: 1712916392000,
      channel: '支付宝[网商银行转出]',
    },
  ]));

test('支付宝小荷包', () =>
  testAnkio('支付宝小荷包', [
    {
      type: 2,
      money: 5,
      fee: 0,
      shopName: '支付宝小荷包(某某某的情侣小荷包)',
      shopItem: '转入成功',
      accountNameFrom: '余额宝',
      accountNameTo: '支付宝小荷包(某某某的情侣小荷包)',
      currency: 'CNY',
      time: 1713229525000,
      channel: '支付宝[小荷包自动攒]',
    },
    {
      type: 1,
      money: 1000,
      fee: 0,
      shopName: '支付宝小荷包',
      shopItem: '**向支付宝小荷包转入￥1000.00',
      accountNameFrom: '支付宝小荷包(某某某的情侣小荷包)',
      accountNameTo: '',
      currency: 'CNY',
      time: 1716194408000,
      channel: '支付宝[小荷包存入]',
    },
    {
      type: 1,
      money: 0.15,
      fee: 0,
      shopName: '支付宝小荷包',
      shopItem: '昨日收益：+0.15',
      accountNameFrom: '支付宝小荷包(某某某的情侣小荷包)',
      accountNameTo: '',
      currency: 'CNY',
      time: 1716081246000,
      channel: '支付宝[小荷包收益]',
    },
  ]));

test('支付宝余额宝收益', () =>
  testAnkio('支付宝余额宝收益', [
    {
      type: 1,
      money: 0.01,
      fee: 0,
      shopName: '余额宝',
      shopItem: '04-15余额宝收益',
      accountNameFrom: '余额宝',
      accountNameTo: '',
      currency: 'CNY',
      time: 1713275758000,
      channel: '支付宝[余额宝收益]',
    },
  ]));
test('支付宝收款到账', () =>
  testAnkio('支付宝收款到账', [
    {
      type: 1,
      money: 0.3,
      fee: 0,
      shopName: '北京快手科技有限公司 bjk***@kuaishou.com',
      shopItem: '到账成功',
      accountNameFrom: '',
      accountNameTo: '',
      currency: 'CNY',
      time: 1714212854000,
      channel: '支付宝[收款到账]',
    },
  ]));
test('支付宝蚂蚁财富', () =>
  testAnkio('支付宝蚂蚁财富', [
    {
      type: 0,
      money: 401.03,
      fee: 0,
      shopName: '你的总资产收益已更新',
      shopItem: '2024-05-15总资产收益已更新',
      accountNameFrom: '支付宝蚂蚁财富',
      accountNameTo: '',
      currency: 'CNY',
      time: 1715843879000,
      channel: '支付宝[蚂蚁财富]',
    },
  ]));
