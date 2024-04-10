import { RuleObject } from "../../../../utils/RuleObject";
import { BillType } from "../../../../utils/BillType";
import { Currency } from "../../../../utils/Currency";


export function get(data) {
    data = JSON.parse(data);
    let mapItem = data.mMap;
    if (mapItem.source!=="长沙住房公积金") return null;
    if (mapItem.title==="公积金账户资金变动提醒") {
        let result = {
                type: null,
                money: 0,
                fee: 0,
                shopName: "",
                shopItem: "",
                accountNameFrom: "",
                accountNameTo: "",
                currency: Currency['人民币'],
                time: null,
                channel:mapItem.title
            };
        let text = mapItem.description;
        let regex = /账户类型：(.*?)\n业务日期：(.*?)\n业务描述：(.*?)\n业务金额：(.*?)\n账户余额：.*/;
        let match = text.match(regex);
        if (match) {
            if (match[3].includes("汇缴")) {
                result.type = BillType.Income;
            }
            result.time = match[2];
            result.shopName = mapItem.source;
            result.shopItem = match[3];
            result.money = parseFloat(match[4]);
            result.accountNameFrom = match[1];
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