import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME = "美团";
const TITLES = ["支付成功通知"];

// 定义用于解析文本的正则表达式
const regex = /消费账户：(.*?)\n支付金额：(人民币)?(.*?)元\n支付方式：(.*?)\n支付时间：(.+)/;

/**
 * 解析文本并返回解析结果。
 * @param {string} text - 需要解析的文本。
 * @returns {Object|null} - 解析后的结果对象，如果解析失败则返回null。
 */
function parseText(text) {
    let match = text.match(regex);
    if (!match) return null;

    // 解析数据
    const [, shopItem,, money, accountNameFrom, time] = match;

    // 返回解析结果
    return {
        type: BillType.Expend,
        time: time.trim(),
        shopName:SOURCE_NAME,
        shopItem:shopItem,
        money:parseFloat(money),
        accountNameFrom:accountNameFrom,
        channel:"微信[美团消费]"
    };
}

/**
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
