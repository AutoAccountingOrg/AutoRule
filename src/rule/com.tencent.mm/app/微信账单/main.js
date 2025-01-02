import { BillType, convertToNumber, RuleObject, splitShop, toFloat } from 'common/index.js';

/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get (data) {
  let json = JSON.parse(data);
  if (json.ret_code !== 0 || json.ret_msg !== 'ok') {
    return null;
  }
  let shopName = json.header.nickname;
  let money = json.header.fee;
  let billType = BillType.Income;
  let billTypeName = '收入';
  if (money.includes('-')) {
    billType = BillType.Expend;
    billTypeName = '支出';
  }

  let obj = new RuleObject(billType);
  obj.shopName = shopName;
  obj.money = toFloat(money);
  obj.channel = `微信[账单-${billTypeName}]`;

  for (let item of json.preview) {
    if (item.label) {
      let label = item.label.name;
      if (item.value.length === 0) {
        continue;
      }
      let value = item.value[0].name;
      switch (label) {
        case '商品':
        case '收款方备注':
          obj.shopItem = value;
          break;
        case '商户全称':
          obj.shopName = value;
          break;
        case  '支付方式':
          obj.accountNameFrom = value;
          break;
        case '支付时间':
        case '转账时间':
        case '到账时间':
          obj.time = convertToNumber(value) * 1000;
          break;
        case '服务费':
          obj.fee = toFloat(value);
          break;
        case '提现银行':
          obj.accountNameTo = value;
      }
    }
  }

  if (shopName.indexOf('零钱提现') !== -1) {
    obj.type = BillType.Transfer;
    obj.accountNameFrom = '微信零钱';
    obj.channel = `微信[账单-提现]`;
  }

  if (obj.shopItem.length === 0) {
    let { shopName, shopItem } = splitShop(obj.shopName);
    obj.shopName = shopName;
    obj.shopItem = shopItem;

  }

  return obj;

}
