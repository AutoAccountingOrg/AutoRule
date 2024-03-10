import {BillType} from "../../../utils/BillType";
import {RuleObject} from "../../../utils/RuleObject";
import {Currency} from "../../../utils/Currency";

export function get(data) {
    data = JSON.parse(data)
    let pl = JSON.parse(data[0].pl)
    if(pl.templateType === "BN"){ //转账收款
        var dataItems = JSON.parse(pl.extraInfo)
        return new RuleObject(
            BillType.Income,
            dataItems.money,
            dataItems.assistMsg1,
            dataItems.topSubContent,
            "",
            "支付宝余额",
            0,
            Currency['人民币'],
            data.mct,
            "支付宝转账收款"
        )
    }else if(pl.templateType === "S"){ //收款码收款
        var dataItems = JSON.parse(pl.extraInfo)
        return new RuleObject(
            BillType.Income,
            parseFloat(dataItems.content.replace("收款金额￥","")),
            dataItems.title,
            dataItems.assistMsg2,
            "",
            "支付宝余额",
            0,
            Currency['人民币'],
            data.mct,
            "支付宝收款码收款")
    }

    return null;
}
export function app(){
    return "com.eg.android.AlipayGphone"
}


