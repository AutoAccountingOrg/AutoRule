
/**
 * @param {string} text - 需要解析的文本
 * @param {[regex,function] } rules
 * @param t
 * @returns {RuleObject|null} - 解析结果对象，如果解析失败则返回null
 */
function parseText(text,rules,t,item) {
  for (let [regex,handler] of rules) {
    const match = text.match(regex);
    if (match) {
      return handler(match,t,item);
    }
  }
  return null;
}


export function parseWechat (data,rules,SOURCE,TITLE) {
  const mapItem = JSON.parse(data).mMap;
  if (mapItem.source !== SOURCE || !TITLE.includes(mapItem.title.replace(/[\d.,]+/g, ''))) return null;

  return parseText(mapItem.description,rules,mapItem.t,mapItem)
}
