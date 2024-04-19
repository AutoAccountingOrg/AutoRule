import { RuleObject } from '../../../../utils/RuleObject';
import { BillType } from '../../../../utils/BillType';
import { Currency } from '../../../../utils/Currency';

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
    BN: parseBN,
    S: parseS,
  };
  const action = actions[pl.templateType];
  if (action) {
    action(pl, result);
  } else {
    throw new Error(
      `[支付宝消息盒子] Unknown templateType: ${pl.templateType}`,
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
        result.channel,
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
  let money = parseFloat(contentItems.money);
  if (isNaN(money)) {
    throw new Error('[支付宝消息盒子] Invalid money: ' + contentItems.money);
  }
  result.money = money;

  // 处理pl.link的逻辑
  handleLink(pl, result);

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
    2021002117633826: handleReceipt,
    2015111300788246: handleInvestmentIncome,
    66666708: handleYueLibaoIncome,
    77700207: handleWebBankTransfer,
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
      '[支付宝消息盒子] Error setting result properties: ' + error.message,
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
    type: null,
    money: 0,
    fee: 0,
    shopName: '',
    shopItem: '',
    accountNameFrom: '',
    accountNameTo: '',
    currency: Currency['人民币'],
    time: data[0].mct,
    channel: '支付宝' + pl.title,
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
        result.shopName = item.content;
        break;
      case '付款方式：':
      case '退款方式：':
        result.accountNameFrom = item.content;
        break;
      case '扣款说明：':
      case '退款说明：':
        result.shopItem = item.content;
        break;
      case '付款人：':
        result.shopName = item.content;
        break;
    }
  });
}

/**
 * 处理pl.link的逻辑
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleLink(pl, result) {
  const dataItems = JSON.parse(pl.extraInfo);
  const bizType = pl.link.replace(/.*&bizType=(.*?)[&\?].*/, '$1');
  const bizTypeMap = {
    TRADEAP: ['退款', dataItems.sceneExt2.sceneName, BillType.Income],
    B_TRANSFER: ['发红包', '', BillType.Expend],
    TRADE: ['消费', '', BillType.Expend],
    PREAUTHPAY: ['预授权消费', '', BillType.Expend],
    PPAY: ['亲情卡消费', '', BillType.Expend],
    D_TRANSFER: ['转账收款', pl.title, BillType.Income, '余额', '', pl.title],
    YEB: [
      '转账到余额宝',
      dataItems.topSubContent,
      BillType.Transfer,
      '',
      '余额宝',
      dataItems.topSubContent,
    ],
    BIZFUND: [
      '小荷包自动攒',
      pl.title,
      BillType.Transfer,
      dataItems.assistMsg1,
      dataItems.assistMsg2,
      dataItems.topSubContent,
    ],
  };

  if (bizTypeMap[bizType]) {
    const [
      channel,
      shopName,
      type,
      accountNameFrom = '',
      accountNameTo = '',
      shopItem,
    ] = bizTypeMap[bizType];
    result.channel = `支付宝[${channel}]` || result.channel;
    result.shopName = shopName || result.shopName;
    result.type = type;
    result.accountNameFrom = accountNameFrom || result.accountNameFrom;
    result.accountNameTo = accountNameTo || result.accountNameTo;
    result.shopItem = shopItem || result.shopItem;
  }
}

//------- parseS子函数 --------------------------------------------------

/**
 * 处理收款码收款
 * @param {Object} dataItems - 数据项对象
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleReceipt(dataItems, pl, result) {
  setResultProperties(result, {
    type: BillType.Income,
    money: parseFloat(dataItems.content.replace('收款金额￥', '')),
    shopName: dataItems.assistMsg2,
    shopItem: dataItems.assistMsg1,
    accountNameFrom: '支付宝余额',
    channel: '支付宝[收款码收款]',
  });
}

/**
 * 处理理财收益
 * @param {Object} dataItems - 数据项对象
 * @param {Object} pl - 解析后的pl对象
 * @param {Object} result - 解析后的交易结果对象
 */
function handleInvestmentIncome(dataItems, pl, result) {
  setResultProperties(result, {
    type: BillType.Income,
    money: parseFloat(dataItems.mainText.replace(/∝|\+/g, '')),
    shopName: pl.title,
    shopItem: `${dataItems.assistMsg1}（${dataItems.subCgyLeftKey}：${dataItems.subCgyLeftValue.replace(/∝/g, '')}；${dataItems.subCgyMiddleKey}：${dataItems.subCgyMiddleValue.replace(/∝/g, '')}；${dataItems.subCgyRightKey}：${dataItems.subCgyRightValue.replace(/∝/g, '')}）`,
    accountNameFrom: '余利宝',
    channel: '支付宝[理财收益]',
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
    type: BillType.Income,
    money: parseFloat(dataItems.content),
    shopName: pl.title,
    shopItem: `${dataItems.assistMsg1}${dataItems.homePageTitle}`,
    accountNameFrom: '余利宝',
    channel: '支付宝[余利宝收益]',
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
    type: BillType.Transfer,
    money: parseFloat(dataItems.content),
    shopName: pl.title,
    shopItem: `${dataItems.homePageTitle}`,
    accountNameFrom: `${dataItems.title}(${dataItems.assistMsg3})`,
    accountNameTo: `${dataItems.assistMsg2}`,
    channel: '支付宝[网商银行转出]',
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
