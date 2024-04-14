
import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = "长沙银行";
const TITLES = ["交易成功提醒"];

// 定义用于解析文本的正则表达式
const regex = /交易时间：(.*?)\n交易类型：(.*?)（个人账户：尾号(\d{4})）\n交易金额：人民币(.*?)元\n账户余额：.*?元\n交易说明：(.*)/;

/**
 * 解析文本并返回解析结果
 * @param {string} text - 要解析的文本
 * @returns {Object|null} - 解析结果对象，如果解析失败则返回null
 */
function parseText(text) {
    const match = text.match(regex);
    if (!match) return null;
    const currentYear = new Date().getFullYear();  // 获取当前年份

    // 使用解构赋值从match数组中提取值
    const [, time, type, account, money, shopItem] = match;
    const accountNameFrom = `长沙银行（${account}）`;

    return {
        type: type.includes("支付取出") ? BillType.Expend : null,
        time: `${currentYear}年${time}`,
        shopItem,
        money: parseFloat(money.replace(",", "")),
        accountNameFrom
    };
}

/**
 * 处理数据并返回结果
 * @param {string} data - 要处理的数据
 * @returns {RuleObject|null} - 处理结果对象，如果处理失败则返回null
 */
export function get(data) {
    // 解析数据
    const mapItem = JSON.parse(data).mMap;

    // 检查源名称和标题是否匹配
    if (mapItem.source !== SOURCE_NAME ||
        !TITLES.includes(mapItem.title)
    ) {
        return null;
    }

    // 解析文本
    const parsedData = parseText(mapItem.description);
    // 检查解析结果是否有效
    if (!parsedData ||
        parsedData.type === null
    ) {
        return null;
    }

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
        `微信[长沙银行交易通知]`
    );
}
