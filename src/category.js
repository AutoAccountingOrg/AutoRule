import {BillType} from "./utils/BillType";

const money = money || 0,
    type = type || BillType.Expend,
    shopName = shopName || "",
    shopItem = shopItem || "",
    time = time || "00:00";


import {get as CategoryGet} from "./category/CategoryMain";

console.log(CategoryGet(money,type,shopName,shopItem,time));
