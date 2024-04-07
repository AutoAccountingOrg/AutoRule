import {BillType} from "../../../../utils/BillType";
import {RuleObject} from "../../../../utils/RuleObject";
import {Currency} from "../../../../utils/Currency";
import {stripHtml} from "../../../../utils/Html";


export function get(data) {
    data = JSON.parse(data)
    let pl = JSON.parse(data[0].pl)
    var dataItems = JSON.parse(pl.templateJson)
    return new RuleObject(
        BillType.Income,
        parseFloat(dataItems.statusLine1Text.replace("元","")),
        stripHtml(dataItems.subtitle),
        dataItems.title,
        "支付宝余额",
        "",
        0,
        Currency['人民币'],
        data[0].mct,
        "支付宝红包")
}
export function app(){
    return "com.eg.android.AlipayGphone"
}

export function name(){
    return "支付宝红包"
}

