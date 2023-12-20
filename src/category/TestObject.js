export class TestObject {
    /**
     *
     * @param shopName 商户名称
     * @param shopItem 商品名称
     * @param money 金额
     * @param type 支付类型 使用BillType
     * @param time 时间
     */
    constructor(shopName = "", shopItem = "", money = 0, type = 0, time = "12:00") {
        this.shopName = shopName;
        this.shopItem = shopItem;
        this.money = money;
        this.type = type;
        this.time = time;
    }

}
