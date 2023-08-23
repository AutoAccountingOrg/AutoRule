import {BillType} from "../../utils/BillType";
import {RuleObject} from "../../utils/RuleObject";
import {Currency} from "../../utils/Currency";

export function get(data) {
    if(data.title==="微信支付"){
        if(data.body.startsWith("收款到账")){
            return  new RuleObject(BillType.Income,data.body.replace("收款到账","").replace("元",""),"","","微信余额","",0,Currency["人民币"])
        }
    }
    return null;
}
export function app(){
    return "com.tencent.mm"
}
export function name(){
    return "微信收款到账";
}

export function test(){
    return [
        {
            "title":"微信支付",
            "body":"收款到账2元"
        },
    ]
}


