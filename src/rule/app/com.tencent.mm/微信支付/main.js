import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';
import { formatDate } from '../../../../utils/Time';
import { toFloat } from '../../../../utils/Number';

// 定义源名称和需要匹配的标题数组
const SOURCE_NAME_WECHAT = '微信支付';
const TITLES_WECHAT = [
  '已支付¥',
  '已扣费¥',
  '微信支付收款元',
  '微信支付收款元(朋友到店)',
  '转账过期退款到账通知',
  '你收到一笔分销佣金',
  '微信支付凭证',
  '你有一笔收款入账',
  '你收到一笔活动奖励',
  '零钱通定时转入成功通知',
];
var mapItem;

// 正则表达式和处理函数的映射关系
const regexMap = new Map([
  [
    /付款金额¥(\d+\.\d{2})\n支付方式(.*?)\n交易状态.*/,
    match => ({
      money: parseFloat(match[1]),
      accountNameFrom: match[2],
      type: BillType.Expend,
      channel: '微信[微信支付-付款]',
    }),
  ],
  [
    /付款金额￥(\d+\.\d{2})\n付款方式(.*?)\n收单机构.*/,
    match => ({
      money: parseFloat(match[1]),
      accountNameFrom: match[2],
      type: BillType.Expend,
      channel: '微信[微信支付-付款]',
    }),
  ],
  [
    /扣费金额￥(\d+\.\d{2})\n(扣费服务(.*?)\n)?扣费(内容|项目)(.*?)\n支付方式(.*?)\n收单机构.*(\n备注(.*?。))?/,
    match => {
      const [, money, , shopName, , shopItem, accountNameFrom, , remark] =
        match;
      return {
        money: parseFloat(money),
        accountNameFrom,
        shopName: mapItem.display_name ? mapItem.display_name : shopName,
        shopItem: remark ? shopItem + ', ' + remark : shopItem,
        type: BillType.Expend,
        channel: '微信[微信支付-扣费]',
      };
    },
  ],
  [
    /收款金额￥(\d+\.\d{2})\n(付款方备注(.*?)\n)?汇总(.*?)\n备注.*/,
    match => ({
      money: toFloat(match[1]),
      type: BillType.Income,
      shopItem: match[3] !== undefined ? match[3] + ' ' + match[4] : match[4],
      accountNameFrom: '零钱',
      channel: '微信[微信支付-收款]',
    }),
  ],
  [
    /收款金额￥(\d+\.\d{2})\n收款账户(.*?)\n付款商家(.*)(\n付款备注(.*))?/,
    match => ({
      money: parseFloat(match[1]),
      type: BillType.Income,
      accountNameFrom: match[2],
      shopName: match[3],
      shopItem: match[5] || mapItem.title,
      channel: '微信[微信支付-收款（商家）]',
    }),
  ],
  [
    /退款金额￥(\d+\.\d{2})\n退款方式退回(.*?)\n退款原因(.*?)\n(到账|退款)时间(.*?)\n.*/,
    match => {
      const [, money, accountNameFrom, shopItem, , time] = match;
      return {
        money: parseFloat(money),
        type: BillType.Income,
        channel: '微信[微信支付-退款]',
        time: formatDate(time, 'Y-M-D h:i:s'),
        shopItem,
        accountNameFrom,
      };
    },
  ],
  [
    /付款金额¥(\d+\.\d{2})\n支付方式(.*?)\n交易状态支付成功，对方已收款/,
    match => {
      const [money, payTool] = match;
      return {
        money: parseFloat(money),
        type: BillType.Expend,
        accountNameFrom: payTool,
        channel: '微信[微信支付-付款]',
      };
    },
  ],
  [
    /收款金额¥ (\d+\.\d{2})\n收款账户(.*)/,
    match => {
      const [, money, accountNameFrom] = match;
      return {
        money: parseFloat(money),
        type: BillType.Income,
        accountNameFrom: accountNameFrom,
        time: formatDate(),
        channel: '微信[微信支付-收款入账]',
      };
    },
  ],
  [
    /转入金额¥(\d+\.\d{2})\n累计转入¥(\d+\.\d{2})\n扣款账户(.*?)$/,
    match => {
      const [, money, total, accountNameFrom] = match;
      return {
        money: toFloat(money),
        type: BillType.Transfer,
        accountNameFrom: accountNameFrom,
        accountNameTo: '零钱通',
        shopItem: `累计转入¥${total}`,
        time: formatDate(),
        channel: '微信[微信支付-零钱通定时转入]',
      };
    },
  ],
]);

/**
 * 解析微信支付文本
 * @param {string} text - 需要解析的文本
 * @returns {Object|null} - 解析结果对象，如果解析失败则返回null
 */
function parseWeChatText(text) {
  for (let [regex, handler] of regexMap) {
    const match = text.match(regex);
    if (match) {
      return handler(match);
    }
  }
  return null;
}

/**
 * 获取规则对象
 * @param {string} data - JSON格式的数据
 * @returns {RuleObject|null} - 规则对象，如果获取失败则返回null
 */
export function get(data) {
  mapItem = JSON.parse(data).mMap;
  if (
    mapItem.source !== SOURCE_NAME_WECHAT ||
    !TITLES_WECHAT.includes(mapItem.title.replace(/\d+\.\d{2}/, ''))
  ) {
    return null;
  }
  // 解析文本
  const parsedText = parseWeChatText(mapItem.description);
  if (!parsedText || parsedText.type === null) {
    return null;
  }

  // 创建并返回RuleObject对象
  return new RuleObject(
    parsedText.type,
    parsedText.money,
    parsedText.shopName || mapItem.display_name || parsedText.cachedPayShop,
    parsedText.shopItem,
    parsedText.accountNameFrom,
    parsedText.accountNameTo,
    0,
    Currency['人民币'],
    parsedText.time || formatDate(),
    parsedText.channel,
  );
}
