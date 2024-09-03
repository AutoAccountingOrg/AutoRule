import { BillType, Currency, formatDate, RuleObject } from 'common/index.js';

/**
 * 处理数据并返回结果
 * @param {string} data - 要处理的数据
 * @returns {RuleObject|null} - 处理结果对象，如果处理失败则返回null
 */
export function get(data) {
  try {
    // 解析数据
    const { description, source, title } = JSON.parse(data).mMap;

    // 检查源名称和标题是否匹配
    if (source !== '收钱吧福利社' || title !== '交易完成通知') {
      return null;
    }

    // 使用解构赋值从description.match数组中提取值
    const [_, money, , shopName, shopItem] = description.match(
      /订单金额：(\d+(\.\d{2})?)元\n商品详情：(.*?) (.*?)?\n订单编号：\d+/  );

    // 创建并返回RuleObject对象
    return new RuleObject(
      BillType.Expend,
      parseFloat(money),
      shopName,
      shopItem,
      '',
      '',
      0,
      Currency['人民币'],
      formatDate(),
      `微信[收钱吧消费通知]`  );
  } catch (error) {
    throw new Error(`[微信公众号收钱吧福利社] get function: ${error}`);
  }
}
