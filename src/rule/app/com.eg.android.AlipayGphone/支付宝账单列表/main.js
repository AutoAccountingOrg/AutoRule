import { BillType } from '../../../../utils/BillType';
import { RuleObject } from '../../../../utils/RuleObject';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';

/**
 * 解析支付宝账单数据
 * @param {string} data - 包含支付宝账单数据的JSON字符串
 * @returns {RuleObject|null} - 解析后的规则对象，如果解析失败则返回null
 */
export function get(data) {
  // 解析数据
  const { extension, fields } = JSON.parse(data);
  if (!extension || !fields) {
    return null;
  }

  // 创建结果对象
  const result = createResultObject(extension);

  // 处理每个字段元素
  fields.forEach(element => processElement(element, result));

  // 处理业务类型
  if (!processBizType(extension, result)) {
    return null;
  }

  // 创建并返回规则对象
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
    result.channel,
  );
}

/**
 * 解析元素并更新结果对象
 * @param {Object} element - 字段元素对象
 * @param {Object} result - 结果对象
 */
function processElement(element, result) {
  try {
    if (!element.value) {
      return;
    }
    const elementValue = JSON.parse(element.value);

    switch (element.templateId) {
      case 'BLDetailTitle': //BLDetailTitle
        result.shopName = elementValue.content;
        break;
      case 'BLDetailPrice':
        result.money = parseFloat(elementValue.amount.replace(/[+-]/, ''));
        const type = elementValue.amount.replace(/\d+\.\d{0,2}/, '');
        result.type =
          type === '+'
            ? BillType.Income
            : type === '-'
              ? BillType.Expend
              : BillType.Transfer;
        break;
      case 'BLDetailCommon': //BLDetailCommon
      case 'BLH5ProductInfo':
        if (/商品说明|转账备注/.test(elementValue.title)) {
          result.shopItem = elementValue.data[0].content;
        } else if (/创建时间/.test(elementValue.title)) {
          result.data = formatDate(elementValue.data[0].content, 'Y-M-D h:i:s');
        }
        break;
    }
  } catch (error) {
    throw new Error(`[支付宝账单] Error processing element: ${error}`);
  }
}

/**
 * 创建结果对象
 * @param {Object} extension - 扩展数据对象
 * @returns {Object} - 结果对象
 */
function createResultObject(extension) {
  return {
    type: 0,
    money: 0,
    shopName: '',
    shopItem: '',
    accountNameFrom: '余额',
    accountNameTo: '',
    fee: 0,
    currency: Currency['人民币'],
    time: Number(extension.gmtBizCreateTime),
    channel: '',
  };
}

/**
 * 处理业务类型并更新结果对象
 * @param {Object} extension - 扩展数据对象
 * @param {Object} result - 结果对象
 * @returns {boolean} - 处理结果
 */
function processBizType(extension, result) {
  switch (extension.bizType) {
    case 'CHARGE':
      result.channel = '支付宝[收钱码服务费]';
      break;
    case 'TRADE':
      result.channel = '支付宝[收钱码收款]';
      break;
    case 'D_TRANSFER':
      result.channel = '支付宝[转账收款]';
      break;
    case 'YEB':
      result.accountNameTo = '余额宝';
      result.channel = '支付宝[余额宝转账]';
      break;
    case 'MINITRANS':
      result.type = BillType.Income;
      result.accountNameFrom = '余额宝';
      result.channel = '支付宝[余额宝收益]';
      break;
    case 'ISASP':
      result.channel = '支付宝[医保支付]';
      break;
    default:
      return false;
  }
  return true;
}
