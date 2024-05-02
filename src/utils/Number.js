function convertToNumber(value) {
  if (typeof value === 'number') {
    return value; // 如果已经是数字，则直接返回
  } else if (typeof value === 'string') {
    // 如果是字符串，则尝试将其转换为数字
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num; // 返回转换后的数字，如果无法转换则返回 undefined
  } else {
    return 0; // 其他类型返回 undefined
  }
}
/**
 * 金额格式化
 * @param number
 * @returns {number}
 */
export function toFloat(number) {
  return +parseFloat(convertToNumber(number).toPrecision(4));
}

/**
 * 金额除以100
 * @param number
 * @returns {number}
 */
export function toDoubleFloat(number) {
  return toFloat(convertToNumber(number) / 100);
}
