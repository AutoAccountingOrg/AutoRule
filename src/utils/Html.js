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

export function splitShop(shopItem, shopName, split) {
  split = split || "-"; // 默认分隔符为 "-"

  // 如果 shopName 已有值，直接返回
  if (shopName) {
    return { shopName, shopItem };
  }

  if (!shopItem) {
    return { shopName, shopItem }; // 如果 shopItem 为空，直接返回
  }

  const parts = shopItem.split(split);

  // 分隔逻辑
  if (parts.length > 1) {
    shopName = parts.slice(0, -1).join(split); // 前部分作为 shopName
    shopItem = parts[parts.length - 1]; // 最后部分作为 shopItem
  } else {
    shopName = null; // 无分隔符时，默认 shopName 为 null
  }

  return { shopName, shopItem };
}

