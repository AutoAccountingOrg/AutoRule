const { get } = require('./main');
const fs = require('fs');
const path = require('path');

test("支付宝转账收款", () => {

    const dataFilePath = path.join(__dirname, 'tests', '支付宝转账收款.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
        type: 1,
        money: 0.01,
        fee: 0,
        shopName: '从前慢 185******30',
        shopItem: '收到一笔转账',
        accountNameFrom: '余额',
        accountNameTo: '',
        currency: 'CNY',
        time: 1697209372000,
        channel: '支付宝[转账收款]'
    });
})

test("支付宝余额宝自动转入", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝余额宝自动转入.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let result = get(data);

    expect(result).toEqual({
        type: 2,
        money: 0.01,
        fee: 0,
        shopName: '余额宝',
        shopItem: '转入成功',
        accountNameFrom: '账户余额',
        accountNameTo: '余额宝',
        currency: 'CNY',
        time: 1710075625000,
        channel: "支付宝[转账到余额宝]"
    });
})

test("支付宝收款码收款", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝收款码收款.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
        type: 1,
        money: 0.01,
        fee: 0,
        shopName: '老顾客消费',
        shopItem: '今日第4笔收入，共计¥0.04',
        accountNameFrom: '支付宝余额',
        accountNameTo: '',
        currency: 'CNY',
        time: 1703056950000,
        channel: '支付宝[收款码收款]'
    });
})

test("支付宝理财收益", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝理财收益.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let result = get(data);

    expect(result).toEqual({
        type: 1,
        money: 3.16,
        fee: 0,
        shopName: '蚂蚁财富',
        shopItem: '2024-03-27总资产收益已更新（灵活取用：+3.16；稳健理财：-0.01；进阶理财：+0.01）',
        accountNameFrom: '余利宝',
        accountNameTo: '',
        currency: 'CNY',
        time: 1711609388000,
        channel: '支付宝[理财收益]'
    });
})


test("支付宝发红包", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝发红包.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let result = get(data);

    expect(result).toEqual({
        type: 0,
        money: 1,
        fee: 0,
        shopName: '支付宝红包',
        shopItem: '',
        accountNameFrom: '农业银行储蓄卡(9979)',
        accountNameTo: '',
        currency: 'CNY',
        time: 1710774326000,
        channel: '支付宝[发红包]'
    });
})

test("支付宝消费", () => {

    var data = []

    for (let i = 1; i < 4; i++) {
        const dataFilePath = path.join(__dirname, 'tests',`支付宝消费${i}.txt`);

        data.push(fs.readFileSync(dataFilePath, 'utf8'));
    }



    const expectResult = [
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
            channel: '支付宝[消费]'
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
            channel: '支付宝[消费]'
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
            channel: '支付宝[消费]'
        },
        {
            type: 0,
            money: 19.90,
            fee: 0,
            shopName: '广州市动景计算机科技有限公司',
            shopItem: '夸克网盘会员(月\/季\/年)',
            accountNameFrom: '长沙银行储蓄卡(2754)',
            accountNameTo: '',
            currency: 'CNY',
            time: 1712524722000,
            channel: '支付宝[消费]'
        }
    ]

    for (const index in data) {
        let result = get(data[index]);
        expect(result).toEqual(expectResult[index]);
    }
})


test("支付宝退款", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝退款.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let result = get(data);

    expect(result).toEqual({
        type: 1,
        money: 29.82,
        fee: 0,
        shopName: '上海拉扎斯信息科技有限公司',
        shopItem: '退款-麻爪爪·酸辣凤爪·卤味小吃(大朗里悦里店)外卖订单',
        accountNameFrom: '农业银行储蓄卡(9979)',
        accountNameTo: '',
        currency: 'CNY',
        time: 1710669984000,
        channel: '支付宝[退款]'
    });
})

test("支付宝预授权消费", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝预授权消费.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let result = get(data);

    expect(result).toEqual({
        type: 0,
        money: 3,
        fee: 0,
        shopName: "中国人民人寿保险股份有限公司",
        shopItem: "",
        accountNameFrom: "长沙银行储蓄卡(2754)",
        accountNameTo: "",
        currency: "CNY",
        time: 1711441569000,
        channel:    "支付宝[预授权消费]"
    });
})

test("支付宝亲情卡消费", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝亲情卡支付.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let result = get(data);

    expect(result).toEqual({
        type: 0,
        money: 55,
        fee: 0,
        shopName: "173******86(未实名)",
        shopItem: "",
        accountNameFrom: "北京银行信用购(原花呗)",
        accountNameTo: "",
        currency: "CNY",
        time: 1712723745000,
        channel:   "支付宝[亲情卡消费]"
    });
})

test("支付宝余利宝收益", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝余利宝收益.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let result = get(data);

    expect(result).toEqual({
        type: 1,
        money: 9.49,
        fee: 0,
        shopName: "余利宝",
        shopItem: "04-08你的余利宝收益已发放",
        accountNameFrom: "余利宝",
        accountNameTo: "",
        currency: "CNY",
        time: 1712638021000,
        channel:   "支付宝[余利宝收益]"
    });
});