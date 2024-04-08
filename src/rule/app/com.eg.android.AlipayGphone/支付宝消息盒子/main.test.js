const { get } = require('./main');
const path = require("path");
const fs = require("fs");

test("支付宝收款码收款", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝收款码收款.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let result = get(data);

    expect(result).toEqual({
        type: 1,
        money: 0.01,
        fee: 0,
        shopName: '**江',
        shopItem: '商品',
        accountNameFrom: '余额',
        accountNameTo: '',
        currency: 'CNY',
        time: 1703055625000,
        channel: '支付宝收款码收款'
    });
});

test("支付宝收钱码服务费", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝收钱码服务费.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
        type: 0,
        money: 9.50,
        fee: 0,
        shopName: "支付宝(中国)网络技术有限公司",
        shopItem: "收钱码经营版信用卡收钱服务费[2024011022001425671431559132]",
        accountNameFrom: "余额",
        accountNameTo: "",
        currency: "CNY",
        time: 1704854659000,
        channel: "支付宝收钱码经营版信用卡收钱服务费"
    });
});



test("支付宝转账收款", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝转账收款.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
        type: 1, // 0为支出，1为收入，2为转账
        money: 0.01,
        fee: 0,
        shopName: "从前慢",
        shopItem: "转账",
        accountNameFrom: "余额",
        accountNameTo: "",
        currency: "CNY",
        time: 1710075615000,
        channel: "支付宝转账收款"
    });
});

test("支付宝余额转到余额宝", () => {

    var data = []

    for (let i = 1; i < 3; i++) {
        const dataFilePath = path.join(__dirname, 'tests',`支付宝余额转到余额宝${i}.txt`);

        data.push(fs.readFileSync(dataFilePath, 'utf8'));
    }



    const expectResult = [
        {
            type: 2,
            money: 0.01,
            fee: 0,
            shopName: "余额宝",
            shopItem: "转账收款到余额宝",
            accountNameFrom: "余额",
            accountNameTo: "余额宝",
            currency: "CNY",
            time: 1710046787000,
            channel: "支付宝余额转到余额宝"
        },
        {
            type: 2,
            money: 0.01,
            fee: 0,
            shopName: "余额宝",
            shopItem: "转账收款到余额宝",
            accountNameFrom: "余额",
            accountNameTo: "余额宝",
            currency: "CNY",
            time: 1710075624000,
            channel: "支付宝余额转到余额宝"
        }
    ]

    for (const index in data) {
        let result = get(data[index]);
        expect(result).toEqual(expectResult[index]);
    }


});

test("余额宝收益发放", () => {
    const dataFilePath = path.join(__dirname, 'tests', '余额宝收益发放.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
        type: 1,
        money: 0.01,
        fee: 0,
        shopName: "长城基金管理有限公司",
        shopItem: "余额宝-2024.03.25-收益发放",
        accountNameFrom: "余额宝",
        accountNameTo: "",
        currency: "CNY",
        time: 1711393834000,
        channel: "支付宝余额宝收益发放"
    });
});