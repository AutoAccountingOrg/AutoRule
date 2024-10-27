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

  // 如果时间为空，返回当前时间的毫秒级时间戳
  if (time.length === 0) {
    return Math.floor(Date.now() / 10000) * 10000;
  }

  // 确保提供的模板字符串合法
  if (!tpl.match(/[YMDhis]+/g)) {
    throw new Error('Invalid format string');
  }

  // 将模板中的符号替换为正则表达式模式
  const tplRegex = tpl
    .replace(/Y/g, '(\\d{2,4})')  // 捕获4位的年份
    .replace(/M/g, '(\\d{1,2})')  // 捕获1-2位的月份
    .replace(/D/g, '(\\d{1,2})')  // 捕获1-2位的日期
    .replace(/h/g, '(\\d{1,2})')  // 捕获1-2位的小时
    .replace(/i/g, '(\\d{1,2})')  // 捕获1-2位的分钟
    .replace(/s/g, '(\\d{1,2})'); // 捕获1-2位的秒
  // 匹配输入的时间字符串与模板
  const match = time.match(new RegExp(`^${tplRegex}$`));
  if (!match) {
    console.log(tplRegex, time, match);
    throw new Error('Invalid time format');
  }

  // 提取tpl
  const match2 = tpl.match(/[YMDhis]/g);

  const matchObj = {};
  for (let i = 0; i < match2.length; i++) {
    matchObj[match2[i]] = match[i + 1];
  }


  // 提取并填充默认值
  const now = new Date();
  const dateObj = {
    "Y": matchObj["Y"] || now.getFullYear(),
    "M": matchObj["M"] || now.getMonth() + 1,
    "D": matchObj["D"] || now.getDate(),
    "h": matchObj["h"] || now.getHours() + 8,
    "m": matchObj["i"] || 0,
    "s": matchObj["s"] || 0,
  };
  if (dateObj.Y.length === 2) {
    dateObj.Y = "20"+dateObj.Y;
  }
  // 构造日期对象
  const formattedDate = new Date(
    dateObj.Y,
    dateObj.M - 1, // 月份从0开始
    dateObj.D,
    dateObj.h,
    dateObj.m,
    dateObj.s
  );
  // 输出为UTC时间的时间戳（毫秒）
  return  formattedDate.getTime();
}

