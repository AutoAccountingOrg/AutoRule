import {BillType} from "./utils/BillType";

const money = window.money || 0,
    type = window.type || BillType.Expend,
    shopName = window.shopName || "",
    shopItem = window.shopItem || "",
    time = window.time || "00:00";


import {get} from "./category/main";

print(JSON.stringify(get(money,type,shopName,shopItem,time)));
