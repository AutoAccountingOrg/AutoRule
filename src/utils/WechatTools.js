
/**
 * @param {string} text - 需要解析的文本
 * @param {[regex,function] } rules
 * @returns {Object|null} - 解析结果对象，如果解析失败则返回null
 */
function parseText(text,rules) {
  for (let [regex,handler] of rules) {
    const match = text.match(regex);
    if (match) {
      return handler(match);
    }
  }
  return null;
}


export function parseWechat (data,rules,SOURCE,TITLE) {
  const mapItem = JSON.parse(data).mMap;
  if (mapItem.source !== SOURCE || !TITLE.includes(mapItem.title)) return null;

  return parseText(mapItem.description,rules)
}
