const { get } = require('./main');
const fs = require('fs');
const path = require('path');

test("长沙住房公积金每月汇缴", () => {

    const dataFilePath = path.join(__dirname, 'tests', '长沙银行支付宝支付取出.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
        type: 0,
        money: 200,
        fee: 0,
        shopName: '',
        shopItem: '中国电信股份有限公司全渠道运营中心-商品...',
        accountNameFrom: '长沙银行（2754）',
        accountNameTo: '',
        currency: 'CNY',
        time: "04月10日09:03",
        channel: '微信[长沙银行交易通知]'
    });
})
