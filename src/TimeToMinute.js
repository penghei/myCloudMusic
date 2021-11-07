export default function timeToMinute(times) {
    var result = '00:00';
    var minute, second
    if (times > 0) {
        minute = Math.floor(times / 60);
        if (minute < 10) {
            minute = "0" + minute;
        }
        second = Math.floor((times - 60 * minute) % 60);
        if (second < 10) {
            second = "0" + second;
        }
        result = minute + ':' + second
    }
    return result;
}