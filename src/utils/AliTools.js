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
  }
}
