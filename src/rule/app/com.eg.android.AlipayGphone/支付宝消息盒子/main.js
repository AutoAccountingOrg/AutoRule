// 假设这是原有的导入，这里不做修改
import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";

// 解析交易信息的核心函数
function parseTransaction(data) {
    data = JSON.parse(data);
    let pl = JSON.parse(data[0].pl);
    let result = {
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

    // 根据不同的模板类型处理
    if (pl.templateType === "BN") {
        parseBN(pl, result);
    } else if (pl.templateType === "S") {
        parseS(pl, result, data);
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
    let contentItems = JSON.parse(pl.content);
    result.money = parseFloat(contentItems.money);

    // 根据pl.content的content数据设置相应的字段
    contentItems.content.forEach(item => {
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

    // 根据pl.link的bizType设置相应的交易类型
    handleBizType(pl, result);
}

// 处理S类型的模板
function parseS(pl, result, data) {
    let dataItems = JSON.parse(pl.extraInfo);
    if (pl.link.indexOf("appId=60000081") > 0) {
        result.type = BillType.Income;
        result.money = parseFloat(dataItems.content.replace("收款金额￥", ""));
        result.shopName = dataItems.assistMsg2;
        result.shopItem = dataItems.assistMsg1;
        result.accountNameFrom = '支付宝余额';
    } else if (pl.link.indexOf("appId=68688004") > 0) {
        // 理财收益
        result.type = BillType.Income;
        result.money = parseFloat(dataItems.mainText.replace("∝", "").replace("+", ""));
        result.shopName = pl.title;
        result.shopItem = dataItems.assistMsg1;
        result.accountNameFrom = '余利宝';
    }
}

// 处理不同的业务类型
function handleBizType(pl, result) {
    var dataItems = JSON.parse(pl.extraInfo)
        // 根据业务类型设置相应的交易类型
    switch (true) {
       case pl.link.includes("bizType=TRADEAP"):      //支付宝退款
            result.shopName = dataItems.sceneExt2.sceneName;
            result.type = BillType.Income; 
            break;
        case pl.link.includes("bizType=B_TRANSFER"):   //支付宝发红包
        case pl.link.includes("bizType=TRADE"):        //支付宝消费
        case pl.link.includes("bizType=PREAUTHPAY"):   //支付宝预授权消费
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
