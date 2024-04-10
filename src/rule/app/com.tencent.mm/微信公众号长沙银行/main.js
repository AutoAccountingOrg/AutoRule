import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";


export function get(data) {
    data = JSON.parse(data);
    let mapItem = data.mMap;
    if (mapItem.source!=="长沙银行") return null;
    if (mapItem.title==="交易成功提醒") {
        let result = {
                type: null,
                money: 0,
                fee: 0,
                shopName: "",
                shopItem: "",
                accountNameFrom: "",
                accountNameTo: "",
                currency: null,
                time: null,
                channel:"长沙银行"+mapItem.title
            };
        let text = mapItem.description;
        let regex = /交易时间：(.*?)\n交易类型：(.*?)（个人账户：尾号(\d{4})）\n交易金额：人民币(.*?)元\n账户余额：.*?元\n交易说明：(.*)/;
        let match = text.match(regex);
        if (match) {
            if (match[2].includes("支付取出")) {
                result.type = BillType.Expend;
            }
            result.time = match[1];
            result.shopItem = match[5];
            result.money = parseFloat(match[4]);
            result.accountNameFrom =`长沙银行（${match[3]}）`;
            result.currency = Currency['人民币'];
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
            result.channel
        );
    }
}