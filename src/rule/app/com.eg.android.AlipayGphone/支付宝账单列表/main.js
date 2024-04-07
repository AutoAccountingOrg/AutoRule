import {BillType} from "../../../../utils/BillType";
import {RuleObject} from "../../../../utils/RuleObject";
import {Currency} from "../../../../utils/Currency";

export function get(data) {
    data = JSON.parse(data);
    var extension = data.extension;
    var fields = data.fields;

    var result = {
        type: 0,
        money: 0,
        shopName: "",
        shopItem: "",
        accountNameFrom: "",
        accountNameTo: "",
        fee:0,
        currency:Currency["人民币"],
        time: Number(extension.gmtBizCreateTime),
        channel:""
    };

    for (var i = 0; i < fields.length; i++) {
        var element = fields[i];
        if (!element.value) {
            continue; // 跳过这个元素，继续处理下一个
        }
        var elementValue = JSON.parse(element.value);

        if (element.templateId === "BLDetailTitle") {
            result.shopName = elementValue.content;
        } else if (element.templateId === "BLDetailPrice") {
            result.money = parseFloat(elementValue.amount.replace(/[+-]/, ""));
            var type = elementValue.amount.replace(/\d+\.\d{0,2}/, "");
            switch (type) {
                case "+":
                    result.type = BillType.Income;
                    break;
                case "-":
                    result.type = BillType.Expend;
                    break;
                default:
                    result.type = BillType.Transfer;
            }
        } else if (element.templateId === "BLDetailCommon"||element.templateId === "BLH5ProductInfo") {
            if (/商品说明|转账备注/.test(elementValue.title)) {
                result.shopItem = elementValue.data[0].content;
            }
        }
    }

    switch (extension.bizType) {
        case "CHARGE":
            result.accountNameFrom="余额"
            result.channel = "支付宝收钱码经营版信用卡收钱服务费";
            break;
        case "TRADE":
            result.accountNameFrom="余额"
            result.channel = "支付宝收款码收款";
            break;
        case "D_TRANSFER":
            result.accountNameFrom="余额"
            result.channel = "支付宝转账收款";
            break;
        case "YEB":
            result.accountNameFrom="余额"
            result.accountNameTo = "余额宝";
            result.channel = "支付宝余额转到余额宝";
            break;
        case "MINITRANS":
            result.type = BillType.Income;
            result.accountNameFrom = "余额宝";
            result.channel = "支付宝余额宝收益发放";
            break;
        default:
            return null;
    }

    return new RuleObject(
        result.type,
        result.money,
        result.shopName,
        result.shopItem,
        result.accountNameFrom,
        result.accountNameTo,
        result.fee,
        result.currency,
        result.time,
        result.channel);

}

