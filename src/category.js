import { BillType } from 'common/index.js';
import { get } from './category/main';

const money = window.money || 0;
const type = window.type || BillType.Expend;
const shopName = window.shopName || '';
const shopItem = window.shopItem || '';
const time = window.time || '00:00';

print(JSON.stringify(get(money, type, shopName, shopItem, time)));
