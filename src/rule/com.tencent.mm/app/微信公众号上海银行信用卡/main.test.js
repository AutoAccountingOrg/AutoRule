const { get } = require('./main');
const fs = require('fs');
const path = require('path');
const { testAnkioInit, testAnkio } = require('../../../../tests/TestUtils');

const { formatDate } = require('common/index.js');

testAnkioInit(get, __dirname, 'com.tencent.mm');

test('上海银行信用卡消费', () =>
  testAnkio('上海银行信用卡消费', [
    {
      'type': 'Expend',
      'money': 22.74,
      'fee': 0,
      'shopName': '美团',
      'shopItem': '美团App真好嘢粤菜点心老字号（宝安店',
      'accountNameFrom': '上海银行信用卡(4657)',
      'accountNameTo': '',
      'currency': 'CNY',
      'time': formatDate('01月17日 01:31', 'M月D日 h:i'),
      'channel': '微信[上海银行信用卡-支出]'
    }
  ]));
