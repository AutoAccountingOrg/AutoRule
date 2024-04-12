import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = "长沙住房公积金";
const TITLES = ["公积金账户资金变动提醒"];

// 定义用于解析文本的正则表达式
const regex = /账户类型：(.*?)\n业务日期：(.*?)\n业务描述：(.*?)\n业务金额：(.*?)\n账户余额：.*/;

/**
 * 解析文本并返回解析结果。
 * @param {string} text - 需要解析的文本。
 * @returns {Object|null} - 解析后的结果对象，如果解析失败则返回null。
 */
function parseText(text) {
    let match = text.match(regex);
    if (!match) return null;

    // 解析数据
    let type = match[3].includes("汇缴") ? BillType.Income : null;
    let time = match[2];
    let shopName = SOURCE_NAME;
    let shopItem = match[3];
    let money = parseFloat(match[4]);
    let accountNameFrom = match[1];
    let channel = match[3].includes("汇缴") ? "微信[长沙公积金汇缴]":"";

    // 返回解析结果
    return {
        type,
        time,
        shopName,
        shopItem,
        money,
        accountNameFrom,
        channel
    };
}

/**
 * 从微信公众号长沙住房公积金中解析数据并返回RuleObject对象。
 * @param {string} data - 包含数据的JSON字符串。
 * @returns {RuleObject|null} - 解析后的RuleObject对象，如果解析失败则返回null。
 */
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
        parsedData.shopName,
        parsedData.shopItem,
        parsedData.accountNameFrom,
        "",
        0,
        Currency['人民币'],
        parsedData.time,
        parsedData.channel
    );
}
