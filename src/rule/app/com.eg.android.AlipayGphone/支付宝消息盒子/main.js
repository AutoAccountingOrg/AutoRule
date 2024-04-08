import {BillType} from "../../../../utils/BillType";
import {RuleObject} from "../../../../utils/RuleObject";
import {Currency} from "../../../../utils/Currency";

export function get(data) {
    data = JSON.parse(data);            // 将data字符串转换为JSON对象
    var extension = data.extension;     // 获取extension字段
    var fields = data.fields;           // 获取fields字段

    // 定义一个result对象，用于存储解析结果
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

    // 遍历fields数组，处理每一个元素
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

    // 根据extension中的bizType字段，判断交易类型
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

    // 返回result对象
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

