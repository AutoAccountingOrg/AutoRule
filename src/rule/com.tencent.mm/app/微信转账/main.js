import { BillType, Currency, formatDate, RuleObject, toDoubleFloat, toFloat } from 'common/index.js';

function analyzeFromCard(json){

  let content = JSON.parse(json.content);
  let info = content.msg.appmsg.wcpayinfo;
  let money = toFloat(info.feedesc);
  let shopItem = info.pay_memo;
  let billType = BillType.Expend;
  let channel = "付款";
  let subType = parseInt(info.paysubtype) || 0;
  let isSend = parseInt(json.isSend) || 0;
  if (subType === 4){
    if (isSend ===1)return null;
     billType = BillType.Income;
    channel = "退款";
  } else if (subType === 1){
    if (isSend ===0)return null;
    billType = BillType.Expend;
    channel = "付款";
  } else if (subType === 3){
    if (isSend ===0)return null;
    billType = BillType.Income;
    channel = "收款";
  } else {
    return null;
  }
  let shopName = json.hookerUser

  return  new RuleObject(
    billType,
    money,
    shopName,
    shopItem,
    json.cachedPayTools,
    '',
    0.0,
    'CNY',
    json.t,
    `微信[转账${channel}]`
  )
}


function analyzeFromDetail (data) {

  let billType = BillType.Income
  let payTools, channel,t
  if (data.is_payer){
    billType = BillType.Expend
    payTools = data.cachedPayTools
    channel = '微信[转账付款]'
    t = formatDate(data.desc_item_list[0].value, 'Y年M月D日 h:i:s')
  }else {
    payTools = data.status_desc.replace("你已收款，资金已存入","")
    channel = '微信[转账收款]'
    t = formatDate(data.desc_item_list[1].value, 'Y年M月D日 h:i:s')
  }

  // 创建并返回RuleObject对象
  return new RuleObject(
    billType,
    toDoubleFloat(data.fee),
    data.hookUser,
    data.status_desc.replace("%s",""),
    payTools,
    '',
    0,
    Currency['人民币'],
    t,
    `${channel}`  );
}

/**
 * @param {string} data - 包含数据的JSON字符串。
 * @returns {RuleObject|null} - 解析后的RuleObject对象，如果解析失败则返回null。
 */
export function get(data) {
  // 解析数据
  data = JSON.parse(data);

  if (data.type === "transfer") return analyzeFromCard(data);
  if (data.is_payer === undefined)return null;
  return analyzeFromDetail(data);
}
