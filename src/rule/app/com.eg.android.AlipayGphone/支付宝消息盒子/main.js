// 假设这是原有的导入，这里不做修改
import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

// 初始化交易信息
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

// 解析交易信息的核心函数
function parseTransaction(data) {

    // 解析data
    try { data = JSON.parse(data);
    } catch (e) { throw new Error("Invalid data: " + data);}

    // 解析pl
    let pl;
    try { pl = JSON.parse(data[0].pl);
    } catch (e) { throw new Error("Invalid pl: " + data[0].pl);}

    // 初始化result
    let result = initResult(data, pl);

    // 根据不同的模板类型处理
    if (pl.templateType === "BN") {
        parseBN(pl, result);
    } else if (pl.templateType === "S") {
        parseS(pl, result);
    }

    // 若result.type已设置，则返回RuleObject，否则返回null
    return result.type!==null ? new RuleObject(
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

// 处理BN类型的模板
function parseBN(pl, result) {
    // 解析content
    let contentItems;
    try { contentItems = JSON.parse(pl.content);
    } catch (e) { throw new Error("Invalid content: " + pl.content); }

    // 处理contentItems.money的逻辑
    let money = parseFloat(contentItems.money);
    if (isNaN(money)) { throw new Error("Invalid money: " + contentItems.money); }
    result.money = money;

    // 处理contentItems.content的逻辑
    try {
        handleContentItems(contentItems.content, result);
    } catch (e) {
        throw new Error("Error handling content items: " + e.message);
    }

    // 处理pl.link的逻辑
    try {
        handleLink(pl, result);
    } catch (e) {
        throw new Error("Error handling link: " + e.message);
    }
}

// 处理S类型的模板
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
        if (isNaN(money)) {
            throw new Error("Invalid money: " + dataItems.content);
        }
        result.money = money;
        result.shopName = dataItems.assistMsg2;
        result.shopItem = dataItems.assistMsg1;
        result.accountNameFrom = '支付宝余额';
    } else if (pl.link.indexOf("appId=68688004") > 0) {
        // 理财收益
        result.type = BillType.Income;
        let money = parseFloat(dataItems.mainText.replace("∝", "").replace("+", ""));
        if (isNaN(money)) {
            throw new Error("Invalid money: " + dataItems.mainText);
        }
        result.money = money;
        result.shopName = pl.title;
        result.shopItem = dataItems.assistMsg1;
        result.accountNameFrom = '余利宝';
    }
}

// 处理contentItems.content的逻辑
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

// 处理pl.link的逻辑
function handleLink(pl, result) {
    var dataItems = JSON.parse(pl.extraInfo)
    switch (true) {
        case pl.link.includes("bizType=TRADEAP"):      //支付宝退款
            result.shopName = dataItems.sceneExt2.sceneName;
            result.type = BillType.Income; 
            break;
        case pl.link.includes("bizType=B_TRANSFER"):   //支付宝发红包
        case pl.link.includes("bizType=TRADE"):        //支付宝消费
        case pl.link.includes("bizType=PREAUTHPAY"):   //支付宝预授权消费
        case pl.link.includes("bizType=PPAY"):         //支付宝亲情卡消费
            result.type = BillType.Expend;
            break;
        case pl.link.includes("bizType=D_TRANSFER"):   //支付宝转账收款
            result.accountNameFrom = "余额";
            result.shopItem = pl.title;
            result.type = BillType.Income;
            break;
        case pl.link.includes("bizType=YEB"):          //转账到余额宝
            result.type = BillType.Transfer;
            result.shopItem = dataItems.topSubContent;
            result.accountNameTo = "余额宝";
            break;
    }
}



// 示例调用
export function get(data) {
    return parseTransaction(data);
}
