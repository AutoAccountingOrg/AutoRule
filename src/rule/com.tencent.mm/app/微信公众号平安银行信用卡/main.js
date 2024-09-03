import { RuleObject } from 'common/index.js';
import { BillType } from 'common/index.js';
import { Currency } from 'common/index.js';
import { formatDate } from 'common/index.js';
import { toFloat } from 'common/index.js';

const SOURCE_NAME = '平安银行信用卡';
const TITLES = ['消费成功通知'];
const regex =
  /消费商家：(.*?)\n消费时间：(.*?)\n消费金额：RMB(.*?)元\n优惠金额：RMB(.*?)元\n实际金额：RMB(.*?)元/;

/**
 * 解析文本数据，提取所需信息
 * @param {string} text - 待解析的文本数据
 * @returns {Object|null} - 解析后的数据对象，如果解析失败则返回null
 */
function parseText(text) {
  const match = text.match(regex);
  if (!match) return null;

  const [, shopName, time, , fee, money] = match;

  return {
    "type": BillType.Expend,
    time,
    shopName,
    "fee": toFloat(fee),
    "money": toFloat(money),
    "channel": `微信[${SOURCE_NAME} - 消费]`,
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
    '',
    SOURCE_NAME,
    '',
    parsedData.fee,
    Currency['人民币'],
    formatDate(parsedData.time, 'Y年M月D日 h:i'),
    parsedData.channel  );
}
