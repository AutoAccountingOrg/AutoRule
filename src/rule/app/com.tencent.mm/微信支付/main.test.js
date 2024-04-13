const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const {testAnkioInit, testAnkio} = require("../../../../tests/TestUtils");
const {DataType} = require("../../../../utils/DataType");

testAnkioInit(get,__dirname,DataType.App,"com.tencent.mm")
test("微信支付扫码付款给个人", () => testAnkio('微信支付扫码付款给个人',[
    {
        type: 0,
        money: 14.00,
        fee: 0,
        shopName: '',
        shopItem: '',
        accountNameFrom: '零钱',
        accountNameTo: '',
        currency: 'CNY',
        time: "",
        channel: '微信[微信支付]'
    }
]))

test("微信支付扫码付款（第三方收款码）", () => testAnkio('微信支付扫码付款（第三方收款码）',[
    {
        type: 0,
        money: 2.00,
        fee: 0,
        shopName: '',
        shopItem: '',
        accountNameFrom: '零钱',
        accountNameTo: '',
        currency: 'CNY',
        time: "",
        channel: '微信[微信支付]'
    }
]))


