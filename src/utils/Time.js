export function isTimeInRange(startTime, endTime, currentTime) {
    // 将时间字符串转换为分钟表示
    function convertToMinutes(timeStr) {
        const [hours, minutes] = timeStr.split(":").map(Number);
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
