export function stripHtml(html) {
  return html.replace(/<[^>]*>/g, '');
}
export function findNonEmptyString() {
  let args = Array.from(arguments);
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== '' && typeof args[i] === 'string') {
      return args[i];
    }
  }
  return '';
}

export function splitShop(shopItem, _shopName, split) {
  split = split || "-"; // 默认分隔符为 "-"
  if (!shopItem) {
    return { _shopName, shopItem }; // 如果 shopItem 为空，直接返回
  }
  let shopName;
  const parts = shopItem.split(split);
// 分隔逻辑
  if (parts.length > 1) {
    shopName = parts.slice(0, -1).join(split).trim(); // 前部分作为 shopName
    shopItem = parts[parts.length - 1].trim(); // 最后部分作为 shopItem
  } else {
    shopName = _shopName.trim() || ''; // 无分隔符时，默认 shopName 为 null
  }

  if (_shopName && _shopName.indexOf(shopName) === -1) {
    return { _shopName, shopItem };
  }


  return { shopName, shopItem };
}

export function isPaymentType (type, words) {
  let matchType = 'Income';
  let typeName = '收入';
  let _words = [
    '支付',
    '消费',
    '支出',
    '转出',
    '取出'
  ];
  if (words) {
    _words.push(...words);
  }
  for (let i = 0; i < _words.length; i++) {
    if (type.indexOf(_words[i]) !== -1) {
      matchType = 'Expend';
      typeName = '支出';
      break;
    }
  }
  return { matchType, typeName };
}

