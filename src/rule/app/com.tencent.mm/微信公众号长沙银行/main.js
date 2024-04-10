import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = "长沙银行";
const TITLES = ["交易成功提醒"];

// 定义用于解析文本的正则表达式
const regex = /交易时间：(.*?)\n交易类型：(.*?)（个人账户：尾号(\d{4})）\n交易金额：人民币(.*?)元\n账户余额：.*?元\n交易说明：(.*)/;

// 解析文本并返回解析结果
function parseText(text) {
    let match = text.match(regex);
    if (!match) return null;

    let type = match[2].includes("支付取出") ? BillType.Expend : null;
    let time = match[1];
    let shopItem = match[5];
    let money = parseFloat(match[4]);
    let accountNameFrom = `长沙银行（${match[3]}）`;

    return {
        type,
        time,
        shopItem,
        money,
        accountNameFrom
    };
}

// 主函数，处理数据并返回结果
export function get(data) {
    // 解析数据
    data = JSON.parse(data);
    let mapItem = data.mMap;

    // 检查源名称和标题是否匹配
    if (mapItem.source !== SOURCE_NAME || !TITLES.includes(mapItem.title)) return null;

    // 解析文本
    let parsedData = parseText(mapItem.description);
    // 检查解析结果是否有效
    if (!parsedData || parsedData.type===null) return null;

    // 创建并返回RuleObject对象
    return new RuleObject(
        parsedData.type,
        parsedData.money,
        "",
        parsedData.shopItem,
        parsedData.accountNameFrom,
        "",
        0,
        Currency['人民币'],
        parsedData.time,
        `长沙银行${mapItem.title}`
    );
}
