import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';

const SOURCE_NAME = '长沙住房公积金';
const TITLES = ['公积金账户资金变动提醒'];
const regex =
  /账户类型：(.*?)\n业务日期：(.*?)\n业务描述：(.*?)\n业务金额：(.*?)\n账户余额：.*/;

/**
 * 解析文本数据，提取所需信息
 * @param {string} text - 待解析的文本数据
 * @returns {Object|null} - 解析后的数据对象，如果解析失败则返回null
 */
function parseText(text) {
  const match = text.match(regex);
  if (!match) return null;

  const [, accountNameFrom, time, shopItem, money] = match;
  const type = shopItem.includes('汇缴') ? BillType.Income : null;
  const channel = shopItem.includes('汇缴') ? '微信[长沙公积金汇缴]' : '';

  return {
    type,
    time,
    "shopName": SOURCE_NAME,
    shopItem,
    "money": parseFloat(money),
    accountNameFrom,
    channel,
  };
}

/**
 * 根据数据获取规则对象
 * @param {string} data - 数据字符串
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  const mapItem = JSON.parse(data).mMap;
  if (mapItem.source !== SOURCE_NAME || !TITLES.includes(mapItem.title))
    return null;

  const parsedData = parseText(mapItem.description);
  if (!parsedData || parsedData.type === null) return null;

  return new RuleObject(
    parsedData.type,
    parsedData.money,
    parsedData.shopName,
    parsedData.shopItem,
    parsedData.accountNameFrom,
    '',
    0,
    Currency['人民币'],
    formatDate(parsedData.time, 'YMD'),
    parsedData.channel  );
}
