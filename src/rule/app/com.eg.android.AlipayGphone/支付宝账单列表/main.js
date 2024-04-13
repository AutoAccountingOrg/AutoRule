import { BillType } from "../../../../utils/BillType";
import { RuleObject } from "../../../../utils/RuleObject";
import { Currency } from "../../../../utils/Currency";

/**
 * 解析元素并更新结果对象
 * @param {Object} element - 要解析的元素对象
 * @param {Object} result - 结果对象
 */
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

/**
 * 创建结果对象
 * @param {Object} extension - 扩展对象
 * @returns {Object} - 结果对象
 */
const createResultObject = (extension) => {
    return {
        type: 0,
        money: 0,
        shopName: "",
        shopItem: "",
        accountNameFrom: "余额",
        accountNameTo: "",
        fee: 0,
        currency: Currency["人民币"],
        time: Number(extension.gmtBizCreateTime),
        channel: ""
    };
}

/**
 * 处理业务类型并更新结果对象
 * @param {Object} extension - 扩展对象
 * @param {Object} result - 结果对象
 * @returns {boolean} - 是否成功处理业务类型
 */
const processBizType = (extension, result) => {
    switch (extension.bizType) {
        case "CHARGE":
            result.channel = "支付宝[收钱码服务费]";
            break;
        case "TRADE":
            result.channel = "支付宝[收钱码收款]";
            break;
        case "D_TRANSFER":
            result.channel = "支付宝[转账收款]";
            break;
        case "YEB":
            result.accountNameTo = "余额宝";
            result.channel = "支付宝[余额宝转账]";
            break;
        case "MINITRANS":
            result.type = BillType.Income;
            result.accountNameFrom = "余额宝";
            result.channel = "支付宝[余额宝收益]";
            break;
        default:
            return false;
    }
    return true;
}

/**
 * 根据给定的数据获取规则对象
 * @param {string} data - 要解析的数据
 * @returns {RuleObject|null} - 解析后的规则对象，如果解析失败则返回null
 */
export function get(data) {
    try {
        data = JSON.parse(data);
        const { extension, fields } = data;
        if (!extension || !fields) {
            return null;
        }

        let result = createResultObject(extension);

        fields.forEach(element => processElement(element, result));

        if (!processBizType(extension, result)) {
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