const { get } = require('./main');
const path = require("path");
const fs = require("fs");


test("支付宝红包", () => {
    const dataFilePath = path.join(__dirname, 'tests', '支付宝红包.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')
    let result = get(data);

    expect(result).toEqual({
        type: 1,
        money: 0.01,
        fee: 0,
        shopName: '来自从前慢',
        shopItem: '普通红包',
        accountNameFrom: '支付宝余额',
        accountNameTo: '',
        currency: 'CNY',
        time: 1702972951000,
        channel: '支付宝[收红包]'
    });
})

