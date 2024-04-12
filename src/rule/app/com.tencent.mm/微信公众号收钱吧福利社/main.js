import {BillType} from "../../../../utils/BillType";
import {RuleObject} from "../../../../utils/RuleObject";
import {Currency} from "../../../../utils/Currency";

export function get(data) {
    try {
        data = JSON.parse(data);
        const {description, source, title } = data.mMap;

        if (source !== "收钱吧福利社" || title !== "交易完成通知") {
            return null;
        }

        const [_, money,_text1, shopName,shopItem] = description.match(/订单金额：(\d+(\.\d{2})?)元\n商品详情：(.*?) (.*?)?\n订单编号：\d+/);

        return new RuleObject(
            BillType.Expend,
            parseFloat(money),
            shopName,
            shopItem,
            "",
            "",
            0,
            Currency["人民币"],
            "",
            "收钱吧福利社"+title
        );
    } catch (error) {
        console.error(`Error in getShouqianba function: ${error}`);
    }
}