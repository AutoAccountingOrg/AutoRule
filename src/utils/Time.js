export function isTimeInRange(startTime, endTime, currentTime) {
  // 将时间字符串转换为分钟表示
  function convertToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startMinutes = convertToMinutes(startTime);
  const endMinutes = convertToMinutes(endTime);
  const currentMinutes = convertToMinutes(currentTime);

  if (startMinutes <= endMinutes) {
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  } else {
    return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
  }
}

/**
 * 根据指定的格式化字符串格式化时间
 * @param time string 包含时间的字符串，例如 "2021-01-01 12:00:00"
 * @param tpl string 包含格式标记的字符串，例如 "Y-M-D h:i:s"
 * @returns {number}
 */
export function formatDate(time = '', tpl = '') {
  if (time.length === 13) return time;
  if (time.length === 0) {
    return Math.floor(Date.now() / 1000) * 1000;
  }

  const dateObj = {};
  let tplRegex = tpl;
  if (!tpl.match(/[YMDhms]+/g)) {
    throw new Error('Invalid format string');
  }

  tplRegex = tplRegex
    .replace(/Y/g, '(\\d+)')
    .replace(/M/g, '(\\d+)')
    .replace(/D/g, '(\\d+)')
    .replace(/h/g, '(\\d+)')
    .replace(/i/g, '(\\d+)')
    .replace(/s/g, '(\\d+)');

  const match = time.match(new RegExp(`^${tplRegex}$`));

  if (!match) {
    console.log(tplRegex, time, match);
    throw new Error('Invalid time format');
  }

  // Get the current Shanghai time
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() + 8;
  const minute = date.getMinutes();

  // Map the matches to the corresponding date parts
  dateObj.Y = match[1] || year;
  dateObj.M = match[2] || month;
  dateObj.D = match[3] || day;
  dateObj.h = match[4] || hour;
  dateObj.m = match[5] || minute;
  dateObj.s = match[6] || 0;

  return new Date(
    dateObj.Y,
    dateObj.M - 1,
    dateObj.D,
    dateObj.h,
    dateObj.m,
    dateObj.s
  ).getTime();
}

