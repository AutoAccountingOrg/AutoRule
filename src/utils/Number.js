/**
 * 金额格式化
 * @param number
 * @returns {number}
 */
export function toFloat(number) {
  return +parseFloat(number.toPrecision(2));
}

/**
 * 金额除以100
 * @param number
 * @returns {number}
 */
export function toDoubleFloat(number) {
  return toFloat(+parseFloat(number) / 100);
}
