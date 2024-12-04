const { get } = require('./main');
const { testAnkio, testAnkioInit } = require('../../../../tests/TestUtils');
const { formatDate } = require('common/Time.js');


testAnkioInit(get, __dirname, 'cn.gov.pbc.dcep');
  test('数字人民币消费', () =>
    testAnkio('数字人民币消费', [
      {
        "type": 'Expend',
        "money": 2.4,
        "fee": 0,
        "shopName": '广州地铁集团有限公司',
        "shopItem": '',
        "accountNameFrom": '数字人民币(建设银行)',
        "accountNameTo": '',
        "currency": 'CNY',
        "time": 1733144040523,
        "channel": '数字人民币[支出]'
      },
    ]));
