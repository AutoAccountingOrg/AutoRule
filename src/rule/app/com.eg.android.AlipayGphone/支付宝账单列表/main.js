import {BillType} from "../../../../utils/BillType";
import {RuleObject} from "../../../../utils/RuleObject";
import {Currency} from "../../../../utils/Currency";

const processElement = (element, result) => {
    try {
        if (!element.value) {
            return; 
        }
        const elementValue = JSON.parse(element.value);

        switch (element.templateId) {
            case "BLDetailTitle":
                result.shopName = elementValue.content;
                break;
            case "BLDetailPrice":
                result.money = parseFloat(elementValue.amount.replace(/[+-]/, ""));
                const type = elementValue.amount.replace(/\d+\.\d{0,2}/, "");
                result.type = type === "+" ? BillType.Income : type === "-" ? BillType.Expend : BillType.Transfer;
                break;
            case "BLDetailCommon":
            case "BLH5ProductInfo":
                if (/商品说明|转账备注/.test(elementValue.title)) {
                    result.shopItem = elementValue.data[0].content;
                }
                break;
        }
    } catch (error) {
        console.error(`Error processing element: ${error}`);
    }
}

export function get(data) {
    try {
        data = JSON.parse(data);
        const extension = data.extension;
        const fields = data.fields;

        let result = {
            type: 0,
            money: 0,
            shopName: "",
            shopItem: "",
            accountNameFrom: "余额",
            accountNameTo: "",
            fee:0,
            currency:Currency["人民币"],
            time: Number(extension.gmtBizCreateTime),
            channel:""
        };

        fields.forEach(element => processElement(element, result));

        switch (extension.bizType) {
            case "CHARGE":
                result.channel = "支付宝收钱码经营版信用卡收钱服务费";
                break;
            case "TRADE":
                result.channel = "支付宝收款码收款";
                break;
            case "D_TRANSFER":
                result.channel = "支付宝转账收款";
                break;
            case "YEB":
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
    } catch (error) {
        console.error(`Error in get function: ${error}`);
    }
}
