const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const {testAnkioInit, testAnkio} = require("../../../../tests/TestUtils");
const {DataType} = require("../../../../utils/DataType");

testAnkioInit(get,__dirname,DataType.App,"com.tencent.mm")

test("中国银行入账", () => testAnkio('中国银行入账',[
    {
        type: 1,
        money: 14800.00,
        fee: 0,
        shopName: '',
        shopItem: '银联入账',
        accountNameFrom: '中国银行(7575)',
        accountNameTo: '',
        currency: 'CNY',
        time: "2024年04月12日18:12",
        channel: '微信[中国银行-入账]'
    }
]))

test("中国银行退款", () => testAnkio('中国银行退款',[
    {
        type: 1,
        money: 1000.00,
        fee: 0,
        shopName: '',
        shopItem: '网上快捷退款',
        accountNameFrom: '中国银行(7575)',
        accountNameTo: '',
        currency: 'CNY',
        time: "2024年04月13日13:02",
        channel: '微信[中国银行-退款]'
    }
]))

test("中国银行消费", () => testAnkio('中国银行消费',[
    {
        type: 0,
        money: 1000,
        fee: 0,
        shopName: '',
        shopItem: '网上快捷支付',
        accountNameFrom: "中国银行(7575)",
        accountNameTo: '',
        currency: 'CNY',
        time: "2024年04月13日13:02",
        channel: '微信[中国银行-消费]'
    },
    {
        type: 0,
        money: 31.78,
        fee: 0,
        shopName: '',
        shopItem: '网上快捷支付',
        accountNameFrom: '中国银行(7575)',
        accountNameTo: '',
        currency: 'CNY',
        time: "2024年04月12日18:28",
        channel: '微信[中国银行-消费]'
    },
    {
        type: 0,
        money: 1000,
        fee: 0,
        shopName: '',
        shopItem: '网上快捷支付',
        accountNameFrom: '中国银行(7575)',
        accountNameTo: '',
        currency: 'CNY',
        time: "2024年04月64日64:02",
        channel: '微信[中国银行-消费]'
    },
    {
        type: 0,
        money: 30,
        fee: 0,
        shopName: '',
        shopItem: '网上快捷支付',
        accountNameFrom: "中国银行(0464)",
        accountNameTo: '',
        currency: 'CNY',
        time: "2024年04月12日19:04",
        channel: '微信[中国银行-消费]'
    }
]))