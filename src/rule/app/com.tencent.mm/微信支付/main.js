import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = "微信支付";
const TITLES_WECHAT = ["已支付¥"];

// 定义用于解析文本的正则表达式
const regexWeChat = /付款金额[¥￥](\d+\.\d{2})\n(支付|付款)方式(.*?)\n(交易状态|收单机构).*/;

/**
 * 解析微信支付文本并返回账单对象
 * @param {string} text - 微信支付文本
 * @returns {Object|null} - 账单对象，如果解析失败则返回null
 */
function parseWeChatText(text) {
    const match = text.match(regexWeChat);
    if (!match) return null;

    const [_, amountText, _text1, accountNameFrom, _text2] = match;
    const money = parseFloat(amountText);

    return {
        type: BillType.Expend,
        time: "", // 时间在这个消息中没有提供
        shopItem: "",
        money,
        accountNameFrom
    };
}

/**
 * 根据数据获取微信支付账单对象
 * @param {string} data - 数据字符串
 * @returns {RuleObject|null} - 微信支付账单对象，如果数据不符合规则则返回null
 */
export function get(data) {
    // 解析数据
    data = JSON.parse(data);
    let mapItem = data.mMap;


    if (mapItem.source !== SOURCE_NAME_WECHAT || !TITLES_WECHAT.includes(mapItem.title.replace(/\d+\.\d{2}/, ""))) return null;

    const parsedText = parseWeChatText(mapItem.description);
    // 检查解析结果是否有效
    if (!parsedText || parsedText.type === null) return null;

    return new RuleObject(
        parsedText.type,
        parsedText.money,
        "",
        parsedText.shopItem,
        parsedText.accountNameFrom,
        "",
        0,
        Currency['人民币'],
        parsedText.time,
        mapItem.source
    );
}