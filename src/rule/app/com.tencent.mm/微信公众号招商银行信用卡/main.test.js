const { get } = require('./main');
const {testAnkioInit, testAnkio} = require("../../../../tests/TestUtils");
const {DataType} = require("../../../../utils/DataType");

testAnkioInit(get,__dirname,DataType.App,"com.tencent.mm")

test("招商银行信用卡消费", () => testAnkio('招商银行信用卡消费',[
    {
        type: 0,
        money: 34.69,
        shopName: '美团-牛约堡手(旭辉店)',
        shopItem: '',
        accountNameFrom: '招商银行信用卡（1356）',
        accountNameTo: '',
        fee: 0,
        currency: 'CNY',
        time: "2024年04月11日18:05",
        channel: '微信[招行信用卡消费]'
    },
    {
        type: 0,
        money: 19.68,
        shopName: '美团-奉天熏六记熏拌鸡架（马坡店）',
        shopItem: '',
        accountNameFrom: '招商银行信用卡（1356）',
        accountNameTo: '',
        fee: 0,
        currency: 'CNY',
        time: "2024年04月12日10:53",
        channel: '微信[招行信用卡消费]'
    }
]))