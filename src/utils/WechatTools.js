/**
 * @param {string} text - 需要解析的文本
 * @param {[regex,function] } rules
 * @param t
 * @returns {RuleObject|null} - 解析结果对象，如果解析失败则返回null
 */
function parseText (text, rules, t, item) {
  for (let [regex, handler] of rules) {
    const match = text.match(regex);
    if (match) {
      return handler(match, t, item);
    }
  }
  return null;
}

export function parseWechat (data, rules, SOURCE, TITLE) {
  const mapItem = JSON.parse(data).mMap;
  if (mapItem.source !== SOURCE) {
    return null;
  }
  let title = mapItem.title.replace(/[\d.,]+/g, '');
  if (!TITLE.includes(title)) {
    let isMatch = false;
    for (const titleElement of TITLE) {
      if (titleElement.indexOf('*') !== -1) {
        // 通配符匹配
        if (!title.match(titleElement)) {
          isMatch = true;
          break;
        }
      }

    }
    if (isMatch) {
      return null;
    }
  }

  let d = parseText(mapItem.description, rules, mapItem.t, mapItem);
  return d;
}
