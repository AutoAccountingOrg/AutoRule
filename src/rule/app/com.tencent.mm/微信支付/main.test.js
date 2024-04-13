const { get } = require('./main');
const fs = require('fs');
const path = require('path');

test("微信支付扫码付款（商家收款码）", () => {
    const dataFilePath = path.join(__dirname, 'tests', '微信支付扫码付款（商家收款码）.txt');
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
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
    });
})

test("微信支付扫码付款（第三方收款码）", () => {
    const dataFilePath = path.join(__dirname, 'tests', '微信支付扫码付款（第三方收款码）.txt');
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
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
    });
})