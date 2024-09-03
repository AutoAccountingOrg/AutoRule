import { toFloat } from './Number.js';
import { formatDate } from './Time.js';
import { BillType } from './BillType.js';

export const AliTools = {
  /**
   * 处理contentItems.content的逻辑
   * @param {Array} contentItems - contentItems数组
   * @param {RuleObject} result - 解析后的交易结果对象
   */
  handleContentItems(contentItems, result) {
    contentItems.forEach(item => {
      switch (item.title) {
        case '交易对象：':
        case '付款方：':
        case '付款人：':
          result.shopName = item.content;
          break;
        case '付款方式：':
        case '退款方式：':
          if (item.content === '账户余额') {
            result.accountNameFrom = '支付宝余额';
            break;
          }
          result.accountNameFrom = item.content;
          break;
        case '扣款说明：':
        case '退款说明：':
        case '转账备注：':
          result.shopItem = item.content;
          break;
      }
    });
  },
  handleBillItems(fields, result){
    fields.forEach(element => {
      if (element.value === undefined) return
      const elementValue = JSON.parse(element.value);
      switch (element.templateId) {
        case 'BLDetailTitle':
          result.shopName = elementValue.content;
          break;
        case 'BLDetailPrice':
          result.money = toFloat(elementValue.amount);
          if (result.money < 0){
            result.money = -result.money
          }
          if (elementValue.amount.includes('-')){
            result.type = BillType.Expend;
          } else if (elementValue.amount.includes('+')){
            result.type = BillType.Income;
          } else {
            result.type = BillType.Transfer;
          }
          break;
        default:
          if (/创建时间/.test(elementValue.title)){
            result.time = formatDate(elementValue.data[0].content, 'Y-M-D h:i:s');
          } else if (/付款方式/.test(elementValue.title)){
            result.accountNameFrom = elementValue.data[0].content;
            if (/账户余额|余额/.test(result.accountNameFrom)){
              result.accountNameFrom = '支付宝余额';
            }
          }else if (/商品说明|转账备注/.test(elementValue.title)){
          result.shopItem = elementValue.data[0].content;
        }
      }
    });
  }
}
