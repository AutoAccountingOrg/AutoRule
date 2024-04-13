import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

/**
 * 初始化交易结果对象
 * @param {Array} data - 交易数据
 * @param {Object} pl - 交易数据的pl字段
 * @returns {Object} - 初始化后的交易结果对象
 */
function initResult(data, pl) {
    return {
        type: null,
        money: 0,
        fee: 0,
        shopName: "",
        shopItem: "",
        accountNameFrom: "",
        accountNameTo: "",
        currency: Currency['人民币'],
        time: data[0].mct,
        channel: "支付宝" + pl.title
    };
}

/**
 * 解析交易信息的核心函数
 * @param {Array} data - 交易数据
 * @returns {RuleObject|null} - 解析后的交易结果对象，如果无法解析则返回null
 */
function parseTransaction(data) {

    // 解析data
    try { data = JSON.parse(data); }
    catch (e) { throw new Error("Invalid data: " + data); }

    // 解析pl
    let pl = JSON.parse(data[0].pl);
    if (!pl||isNaN(pl.templateType)) return null;

    // 初始化result
    let result = initResult(data, pl);

    const actions = {
        "BN": parseBN,
        "S": parseS
    };
    (actions[pl.templateType] || (() => {
        console.error(`Unknown templateType: ${pl.templateType}`);
    }))(pl, result);

    // 若result.type已设置，则返回RuleObject，否则返回null
    return !isNaN(result.type) ?
        new RuleObject(
            result.type,
            result.money,
            result.shopName,
            result.shopItem,
            result.accountNameFrom,
            result.accountNameTo,
            result.fee,
            result.currency,
            result.time,
            result.channel)
        : null;
}

/**
 * 处理BN类型的模板
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function parseBN(pl, result) {
    // 解析content
    let contentItems;
    try { contentItems = JSON.parse(pl.content); }
    catch (e) { throw new Error("Invalid content: " + pl.content); }

    // 处理contentItems.money的逻辑
    let money = parseFloat(contentItems.money);
    if (isNaN(money)) { throw new Error("Invalid money: " + contentItems.money); }
    result.money = money;

    // 处理pl.link的逻辑
    try { handleLink(pl, result); }
    catch (e) { throw new Error("Error handling link: " + e.message); }

    // 处理contentItems.content的逻辑
    try { handleContentItems(contentItems.content, result); }
    catch (e) { throw new Error("Error handling content items: " + e.message); }
}

/**
 * 处理S类型的模板
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function parseS(pl, result) {
    let dataItems;
    try {
        dataItems = JSON.parse(pl.extraInfo);
    } catch (e) {
        throw new Error("Invalid extraInfo: " + pl.extraInfo);
    }

    if (pl.link.indexOf("appId=60000081") > 0) {
        result.type = BillType.Income;
        let money = parseFloat(dataItems.content.replace("收款金额￥", ""));
        if (isNaN(money)) { throw new Error("Invalid money: " + dataItems.content); }

        result.money = money;
        result.shopName = dataItems.assistMsg2;
        result.shopItem = dataItems.assistMsg1;
        result.accountNameFrom = '支付宝余额';
        result.channel = '支付宝[收款码收款]';
    } else if (pl.link.indexOf("appId=68688004") > 0) {
        // 理财收益
        result.type = BillType.Income;
        let money = parseFloat(dataItems.mainText.replace("∝", "").replace("+", ""));
        if (isNaN(money)) {
            throw new Error("Invalid money: " + dataItems.mainText);
        }
        result.money = money;
        result.shopName = pl.title;
        result.shopItem = `${dataItems.assistMsg1}（${dataItems.subCgyLeftKey}：${dataItems.subCgyLeftValue.replace("∝", "").replace("∝", "")}；${dataItems.subCgyMiddleKey}：${dataItems.subCgyMiddleValue.replace("∝", "").replace("∝", "")}；${dataItems.subCgyRightKey}：${dataItems.subCgyRightValue.replace("∝", "").replace("∝", "")}）`;
        result.accountNameFrom = '余利宝';
        result.channel = '支付宝[理财收益]';
    } else if (pl.link.indexOf("appId=66666708") > 0) {
        // 余利宝收益
        result.type = BillType.Income;
        let money = parseFloat(dataItems.content);
        if (isNaN(money)) {
            throw new Error("Invalid money: " + dataItems.content);
        }
        result.money = money;
        result.shopName = pl.title;
        result.shopItem = `${dataItems.assistMsg1}${dataItems.homePageTitle}`;
        result.accountNameFrom = '余利宝';
        result.channel = '支付宝[余利宝收益]';
    }
}

/**
 * 处理contentItems.content的逻辑
 * @param {Array} contentItems - contentItems数组
 * @param {Object} result - 解析后的交易结果对象
 */
function handleContentItems(contentItems, result) {
    contentItems.forEach(item => {
        switch (item.title) {
            case "交易对象：":
                result.shopName = item.content;
                break;
            case "付款方式：":
            case "退款方式：":
                result.accountNameFrom = item.content;
                break;
            case "扣款说明：":
            case "退款说明：":
                result.shopItem = item.content;
                break;
            case "付款人：":
                result.shopName = item.content;
                break;
        }
    });
}

/**
 * 处理pl.link的逻辑
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleLink(pl, result) {
    const dataItems = JSON.parse(pl.extraInfo);
    const bizType = pl.link.replace(/.*&bizType=(.*?)[&\?].*/, "$1");
    const bizTypeMap = {
        "TRADEAP": ["退款", dataItems.sceneExt2.sceneName, BillType.Income],
        "B_TRANSFER": ["发红包", "", BillType.Expend],
        "TRADE": ["消费", "", BillType.Expend],
        "PREAUTHPAY": ["预授权消费", "", BillType.Expend],
        "PPAY": ["亲情卡消费", "", BillType.Expend],
        "D_TRANSFER": ["转账收款", pl.title, BillType.Income, "余额", "", pl.title],
        "YEB": ["转账到余额宝", dataItems.topSubContent, BillType.Transfer, "", "余额宝", dataItems.topSubContent]
    };

    if (bizTypeMap[bizType]) {
        const [channel, shopName, type, accountNameFrom = "", accountNameTo = "", shopItem] = bizTypeMap[bizType];
        result.channel = `支付宝[${channel}]` || result.channel;
        result.shopName = shopName || result.shopName;
        result.type = type;
        result.accountNameFrom = accountNameFrom || result.accountNameFrom;
        result.accountNameTo = accountNameTo || result.accountNameTo;
        result.shopItem = shopItem || result.shopItem;
    }
}

/**
 * 获取解析后的交易结果对象
 * @param {Array} data - 交易数据
 * @returns {RuleObject|null} - 解析后的交易结果对象，如果无法解析则返回null
 */
export function get(data) {
    return parseTransaction(data);
}
