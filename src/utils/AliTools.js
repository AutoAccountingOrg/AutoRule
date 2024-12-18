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
        case '对方账户：':
        case 'Trading partner：':
        case 'Counterparty account：':
          result.shopName = item.content;
          break;
        case '付款方式：':
        case '退款方式：':
        case 'Payment method：':

          if (item.content === '账户余额' || item.content === 'Balance') {
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
        case '还款到：':
        case '转入账户：':
          result.accountNameTo = item.content;
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

          if (elementValue.data === undefined) return
          let content = elementValue.data[0].content || "";
          if (/创建时间|支付时间/.test(elementValue.title)){
            result.time = formatDate(content, 'Y-M-D h:i:s');
          } else if (/付款方式/.test(elementValue.title)){
            result.accountNameFrom = content;
            if (/账户余额/.test(result.accountNameFrom)){
              result.accountNameFrom = '支付宝余额';
            }
          }else if (/商品说明|转账备注/.test(elementValue.title)){
          result.shopItem = content;
        }else if (/收款方全称|对方账户/.test(elementValue.title)){
            result.shopName = content;
          } else if(/还款到/.test(elementValue.title)){
            result.accountNameTo = content;
          }
      }
    });
  }
}
