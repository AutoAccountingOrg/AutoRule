const { get } = require('./main');
const fs = require('fs');
const path = require('path');

test("长沙住房公积金每月汇缴", () => {

    const dataFilePath = path.join(__dirname, 'tests', '长沙住房公积金每月汇缴.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
        type: 1,
        money: 2154,
        fee: 0,
        shopName: '长沙住房公积金',
        shopItem: '汇缴[202404]',
        accountNameFrom: '住房公积金账户',
        accountNameTo: '',
        currency: 'CNY',
        time: "20240410",
        channel: '公积金账户资金变动提醒'
    });
})
