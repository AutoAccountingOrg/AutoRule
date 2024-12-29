import { BillType } from './BillType';
import { Currency } from './Currency';

export class RuleObject {
  /**
   *
   * @param type 账单类型，使用BillType
   * @param money 金额 大于0
   * @param shopName 商户名称
   * @param shopItem 商品名称
   * @param accountNameFrom 账单所属资产名称（或者转出账户）
   * @param accountNameTo 转入账户
   * @param fee 手续费
   * @param currency 币种，使用Currency
   * @param time 时间
   * @param channel 具体渠道
   */
  constructor (
    type = BillType.Expend,
    money = 0.01,
    shopName = '',
    shopItem = '',
    accountNameFrom = '',
    accountNameTo = '',
    fee = 0.0,
    currency = Currency['人民币'],
    time = 0,
    channel = ''
  ) {
    /**
     * 账单类型 只有三种
     */
    this.type = type;

    /**
     * 金额 大于0
     */
    this.money = money;

    /**
     * 手续费
     */
    this.fee = fee;

    /**
     * 商户名称
     */
    this.shopName = shopName;

    /**
     * 商品名称
     */
    this.shopItem = shopItem;

    /**
     * 账单所属资产名称（或者转出账户）
     */
    this.accountNameFrom = accountNameFrom;

    /**
     * 转入账户
     */
    this.accountNameTo = accountNameTo;
    /**
     * 币种
     */
    this.currency = currency;
    /**
     * 该记录发生的时间
     * @type {number}
     */
    this.time = time;
    /**
     * 渠道
     */
    this.channel = channel;
  }
}
