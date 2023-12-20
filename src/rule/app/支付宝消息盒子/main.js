import {BillType} from "../../../utils/BillType";
import {RuleObject} from "../../../utils/RuleObject";
import {Currency} from "../../../utils/Currency";

export function get(data) {
    data = JSON.parse(data)
    let pl = JSON.parse(data.pl)
    if(pl.templateType === "BN"){
        var dataItems = JSON.parse(pl.extraInfo)
        return new RuleObject(BillType.Income,dataItems.money,dataItems.assistMsg1,dataItems.topSubContent,"","支付宝余额",0,Currency['人民币'],data.mct,"支付宝转账收款")
    }

    return null;
}
export function app(){
    return "com.eg.android.AlipayGphone"
}
export function name(){
    return "支付宝消息盒子";
}



