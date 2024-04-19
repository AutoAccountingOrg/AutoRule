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
export function formatDate(time, tpl) {
  const dateObj = {};
  let tplRegex = tpl;
  if (!tpl.match(/[YMDhms]+/g)) {
    throw new Error('Invalid format string');
  }

  //  /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2}) (?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})$/

  tplRegex = tplRegex.replace(/Y/g, '(?<Y>\\d+)').replace(/M/g, '(?<M>\\d+)').replace(/D/g, '(?<D>\\d+)').replace(/h/g, '(?<h>\\d+)').replace(/i/g, '(?<i>\\d+)').replace(/s/g, '(?<s>\\d+)');

  const match = time.match(new RegExp(`^${tplRegex}$`));

  if (!match) {
    console.log(tplRegex, time, match);
    throw new Error('Invalid time format');
  }

  //获取上海当前时间
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() + 8;
  const minute = date.getMinutes();

  dateObj.Y = match.groups.Y || year;
  dateObj.M = match.groups.M || month;
  dateObj.D = match.groups.D || day;
  dateObj.h = match.groups.h || hour;
  dateObj.m = match.groups.i || minute;
  dateObj.s = match.groups.s || 0;

  return new Date(dateObj.Y, dateObj.M - 1, dateObj.D, dateObj.h, dateObj.m, dateObj.s).getTime();
}
