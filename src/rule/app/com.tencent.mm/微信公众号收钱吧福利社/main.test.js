const { get } = require('./main');
const fs = require('fs');
const path = require('path');

test("收钱吧消费通知", () => {
    const dataFilePath = path.join(__dirname, 'tests', '收钱吧消费通知.txt');
    // 使用readFileSync来同步读取文件内容
    const data = fs.readFileSync(dataFilePath, 'utf8')

    let result = get(data);

    expect(result).toEqual({
        type: 0,
        money: 2.00,
        shopName: '三津汤包雅雀湖店',
        shopItem: '门店收款',
        accountNameFrom: '',
        accountNameTo: '',
        fee: 0,
        currency: 'CNY',
        time: '',
        channel: '微信[收钱吧消费通知]'
    });
});