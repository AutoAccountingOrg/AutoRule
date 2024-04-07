import {RuleObject} from "../../../../utils/RuleObject";
import {BillType} from "../../../../utils/BillType";
import {Currency} from "../../../../utils/Currency";

export function get(data) {
    data = JSON.parse(data)
    let pl = JSON.parse(data[0].pl)
    if(pl.templateType === "BN"){ //转账收款
        var dataItems = JSON.parse(pl.extraInfo)

        //转账、转账到余额宝都会触发
        if(pl.link.indexOf("bizType=D_TRANSFER") > 0){
            return new RuleObject(
                BillType.Income,
                parseFloat(dataItems.content),
                dataItems.assistMsg1,
                dataItems.topSubContent,
                "支付宝余额",
                "",
                0,
                Currency['人民币'],
                data[0].mct,
                "支付宝"+pl.title
            )
        }else if(pl.link.indexOf("bizType=YEB") > 0){
            return new RuleObject(
                BillType.Transfer,
                parseFloat(dataItems.content),
                pl.title,
                dataItems.topSubContent,
                "支付宝余额",
                dataItems.assistMsg2,
                0,
                Currency['人民币'],
                data[0].mct,
                "支付宝"+pl.title
            )
        }else if(pl.link.indexOf("bizType=B_TRANSFER") > 0){//支付宝发红包
            return new RuleObject(
                BillType.Expend,
                parseFloat(dataItems.content),
                dataItems.assistMsg2,
                "",
                dataItems.assistMsg1,
                "",
                0,
                Currency['人民币'],
                data[0].mct,
                "支付宝"+pl.title
            )
        }else if(pl.link.indexOf("bizType=TRADEAP") > 0){//支付宝退款
            return new RuleObject(
                BillType.Income,
                parseFloat(dataItems.content),
                dataItems.sceneExt2.sceneName,
                dataItems.assistMsg2,
                dataItems.assistMsg1,
                "",
                0,
                Currency['人民币'],
                data[0].mct,
                "支付宝"+pl.title
            )
        }else if(pl.link.indexOf("bizType=TRADE") > 0){//支付宝消费
            return new RuleObject(
                BillType.Expend,
                parseFloat(dataItems.content),
                dataItems.assistMsg2,
                "",
                dataItems.assistMsg1,
                "",
                0,
                Currency['人民币'],
                data[0].mct,
                "支付宝"+pl.title
            )
        }


    }else if(pl.templateType === "S"){

        //console.log(pl)
        //收款码收款
        var dataItems = JSON.parse(pl.extraInfo)

        if(pl.link.indexOf("appId=60000081") > 0){
            return new RuleObject(
                BillType.Income,
                parseFloat(dataItems.content.replace("收款金额￥","")),
                dataItems.assistMsg2,
                dataItems.assistMsg1,
                '支付宝余额',
                "",
                0,
                Currency['人民币'],
                data[0].mct,
                "支付宝"+pl.title
            )
        }else if(pl.link.indexOf("appId=68688004") > 0)
            //TODO 理财收益，目前只有正收益，好像是合并发来的？
            return new RuleObject(
                BillType.Income,
                parseFloat(dataItems.mainText.replace("∝","").replace("+","")),
                pl.title,
                dataItems.assistMsg1,
                '余利宝',
                "",
                0,
                Currency['人民币'],
                data[0].mct,
                "支付宝"+pl.title)
    }


    return null;
}