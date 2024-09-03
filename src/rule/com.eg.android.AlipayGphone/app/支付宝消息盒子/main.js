import { RuleObject,BillType,Currency,toFloat } from 'common/index.js';

//----------------------------------------------------------------------

/**
 * 解析交易信息的核心函数
 * @param {Array} data - 交易数据
 * @returns {RuleObject|null} - 解析后的交易结果对象，如果无法解析则返回null
 */
function parseTransaction(data) {
  data = JSON.parse(data);

  // 解析pl
  const pl = JSON.parse(data[0].pl);
  if (pl == null || pl.templateType == null) {
    return null;
  }

  // 初始化result
  const result = initResult(data, pl);

  // 根据pl.templateType选择不同的处理函数
  const actions = {
    "BN": parseBN,
    "S": parseS
  };
  const action = actions[pl.templateType];
  if (action) {
    action(pl, result);
  } else {
    throw new Error(
      `[支付宝消息盒子] Unknown templateType: ${pl.templateType}`
    );
  }

  // 若result.type已设置，则返回RuleObject，否则返回null
  return !isNaN(result.type)
    ? new RuleObject(
        result.type,
        result.money,
        result.shopName,
        result.shopItem,
        result.accountNameFrom,
        result.accountNameTo,
        result.fee,
        result.currency,
        result.time,
        result.channel
      )
    : null;
}

//----------------------------------------------------------------------

/**
 * 处理BN类型的模板
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function parseBN(pl, result) {
  // 解析content
  let contentItems = JSON.parse(pl.content);

  // 处理contentItems.money的逻辑
  let money = toFloat(contentItems.money);
  if (isNaN(money)) {
    throw new Error('[支付宝消息盒子] Invalid money: ' + contentItems.money);
  }
  result.money = money;

  // 处理pl.link的逻辑
  handleLink(pl, result, contentItems);

  // 处理contentItems.content的逻辑
  handleContentItems(contentItems.content, result);
}

/**
 * 处理S类型的模板
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function parseS(pl, result) {
  const dataItems = JSON.parse(pl.extraInfo);
  const handlers = {
    "2021002117633826": handleReceipt,
    "66666708": handleYueLibaoIncome,
    "77700207": handleWebBankTransfer,
    "2013110100001907": handleYuEBaoIncome,
    "20000793": handleFund,
    "2021001178689171": handleXiaoHeBao,
    "2015111300788246": handleMaYi
  };
  const handler = handlers[pl.appId];
  if (handler) {
    handler(dataItems, pl, result);
  } else {
    throw new Error('[支付宝消息盒子] Unknown appId: ' + pl.appId);
  }
}

//------ 辅助函数 -------------------------------------------------------

/**
 * 设置结果对象的属性
 * @param {Object} result - 交易结果对象
 * @param {Object} properties - 属性对象
 */
function setResultProperties(result, properties) {
  try {
    Object.assign(result, properties);
  } catch (error) {
    throw new Error(
      '[支付宝消息盒子] Error setting result properties: ' + error.message
    );
  }
}

/**
 * 初始化交易结果对象
 * @param {Array} data - 交易数据
 * @param {Object} pl - 交易数据的pl字段
 * @returns {Object} - 初始化后的交易结果对象
 */
function initResult(data, pl) {
  return {
    "type": null,
    "money": 0,
    "fee": 0,
    "shopName": '',
    "shopItem": '',
    "accountNameFrom": '',
    "accountNameTo": '',
    "currency": Currency['人民币'],
    "time": data[0].mct,
    "channel": '支付宝' + pl.title
  };
}

//------ parseBN子函数 --------------------------------------------------

/**
 * 处理contentItems.content的逻辑
 * @param {Array} contentItems - contentItems数组
 * @param {Object} result - 解析后的交易结果对象
 */
function handleContentItems(contentItems, result) {
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

/**
 * 处理pl.link的逻辑
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleLink(pl, result, contentItems) {
  const dataItems = JSON.parse(pl.extraInfo);
  const bizType = pl.link.replace(/.*&bizType=(.*?)[&?].*/, '$1');
  const title = pl.title;

  switch (bizType) {
    case 'TRADEAP':
    case 'TRU_REFUND':
      result.type = BillType.Income;
      result.shopName = dataItems.sceneExt2.sceneName;
      result.shopItem = dataItems.assistMsg2;
      result.accountNameFrom = dataItems.assistMsg1;
      result.channel = '支付宝[退款]';
      break;
    case 'TRADE':
      result.type = BillType.Expend;
      result.channel = '支付宝[消费]';
      break;
    case 'B_TRANSFER':
      result.type = BillType.Expend;
      result.channel = '支付宝[发红包]';
      break;
    case 'PREAUTHPAY':
      result.type = BillType.Expend;
      result.accountNameFrom = dataItems.assistMsg1;
      result.shopName = dataItems.assistMsg2;
      result.channel = '支付宝[预授权消费]';
      break;
    case 'PPAY':
      result.type = BillType.Expend;
      result.accountNameFrom = dataItems.assistMsg1;
      //result.shopName = pl.title;
      result.shopItem = pl.title;
      result.channel = '支付宝[亲情卡消费]';
      break;
    case 'D_TRANSFER':
      result.type = BillType.Income;
      result.accountNameFrom = '支付宝余额';
      result.shopName = dataItems.assistMsg1;
      result.shopItem = dataItems.topSubContent;
      result.channel = '支付宝[转账收款]';
      break;
    case 'YEB':
    case 'FLUX_PROD':
      result.type = BillType.Transfer;
      result.accountNameFrom = '支付宝余额';
      result.accountNameTo = '余额宝';
      result.shopName = dataItems.topSubContent;
      result.shopItem = dataItems.topSubContent;
      result.channel = '支付宝[转账到余额宝]';
      break;

    case 'BIZFUND':
      if (dataItems.topSubContent === '转入成功') {
        result.type = BillType.Transfer;
        result.accountNameFrom = dataItems.assistMsg1;
        result.accountNameTo = dataItems.assistMsg2;
        result.shopName = pl.title;
        result.shopItem = dataItems.topSubContent;
        result.channel = '支付宝[小荷包自动攒]';
      } else if (dataItems.topSubContent === '到账成功') {
        result.type = BillType.Income;
        result.shopName = pl.title;
        result.shopItem = dataItems.topSubContent;
        result.channel = '支付宝[收款到账]';
      }
      break;
    default:
      if (contentItems.status === '奖励到账成功') {
        result.channel = '支付宝[消费奖励]';
        result.accountNameFrom = '支付宝余额';
        result.type = BillType.Income;
      }
  }
}

//------- parseS子函数 --------------------------------------------------
//handleFund
/**
 * 处理基金收益
 * @param {Object} dataItems - 数据项对象
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleFund(dataItems, pl, result) {
  setResultProperties(result, {
    "type": BillType.Income,
    "money": parseFloat(dataItems.assistMsg2.replace('元', '')),
    "shopName": dataItems.assistName1,
    "shopItem": dataItems.assistMsg1,
    "accountNameFrom": '支付宝基金' + dataItems.assistMsg3,
    "channel": '支付宝[基金卖出]'
  });
}
/**
 * 处理收款码收款
 * @param {Object} dataItems - 数据项对象
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleReceipt(dataItems, pl, result) {
  setResultProperties(result, {
    "type": BillType.Income,
    "money": parseFloat(dataItems.content.replace('收款金额￥', '')),
    "shopName": dataItems.assistMsg2,
    "shopItem": dataItems.assistMsg1,
    "accountNameFrom": '支付宝余额',
    "channel": '支付宝[收款码收款]'
  });
}

/**
 * 处理余利宝收益
 * @param {Object} dataItems - 数据项对象
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleYueLibaoIncome(dataItems, pl, result) {
  setResultProperties(result, {
    "type": BillType.Income,
    "money": parseFloat(dataItems.content),
    "shopName": pl.title,
    "shopItem": `${dataItems.assistMsg1}${dataItems.homePageTitle}`,
    "accountNameFrom": '余利宝',
    "channel": '支付宝[余利宝收益]'
  });
}

/**
 * 处理余额宝收益
 * @param {Object} dataItems - 数据项对象
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleYuEBaoIncome(dataItems, pl, result) {
  //余额自动转入余额宝成功
  //余额宝收益到账啦

  switch (dataItems.homePageTitle) {
    case '余额自动转入余额宝成功':
      //TODO没有金额信息
      break;
    case '余额宝收益到账啦':
      setResultProperties(result, {
        "type": BillType.Income,
        "money": parseFloat(pl.content.replaceAll('∝', '').replace('+', '')),
        "shopName": pl.title,
        "shopItem": `${dataItems.assistMsg1}`,
        "accountNameFrom": '余额宝',
        "channel": '支付宝[余额宝收益]'
      });
      break;
  }
}
function handleXiaoHeBao(dataItems, pl, result) {
  var channel = '存入';
  if (dataItems.homePageTitle.indexOf('昨日收益') !== -1) {
    channel = '收益';
  }
  setResultProperties(result, {
    "type": BillType.Income,
    "money": toFloat(dataItems.content),
    "shopName": pl.title,
    "shopItem": `${dataItems.homePageTitle}`,
    "accountNameFrom": `支付宝小荷包(${dataItems.assistMsg1})`,
    "channel": `支付宝[小荷包${channel}]`
  });
}
function handleMaYi(dataItems, pl, result) {
  setResultProperties(result, {
    "type": pl.content.indexOf('-') === -1 ? BillType.Income : BillType.Expend,
    "money": toFloat(pl.content, false),
    "shopName": dataItems.homePageTitle,
    "shopItem": `${dataItems.assistMsg1}`,
    "accountNameFrom": `支付宝蚂蚁财富`,
    "channel": `支付宝[蚂蚁财富]`
  });
}
/**
 * 处理网商银行转出
 * @param {Object} dataItems - 数据项对象
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleWebBankTransfer(dataItems, pl, result) {
  setResultProperties(result, {
    "type": BillType.Transfer,
    "money": parseFloat(dataItems.content),
    "shopName": pl.title,
    "shopItem": `${dataItems.homePageTitle}`,
    "accountNameFrom": `${dataItems.title}(${dataItems.assistMsg3})`,
    "accountNameTo": `${dataItems.assistMsg2}`,
    "channel": '支付宝[网商银行转出]'
  });
}

//------- 主函数 --------------------------------------------------------

/**
 * 获取解析后的交易结果对象
 * @param {Array} data - 交易数据
 * @returns {RuleObject|null} - 解析后的交易结果对象，如果无法解析则返回null
 */
export function get(data) {
  return parseTransaction(data);
}
