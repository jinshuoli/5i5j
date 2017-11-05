export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

// 获取需求所要的时间段
export function getPeriodString() {     // 字符串类型的
  let date = new Date()
  date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
  return formatDate(date, 'yyyy-MM-dd hh:mm:ss') + " - " + formatDate(new Date, 'yyyy-MM-dd hh:mm:ss')
}
export function getPeriodArray() {      // 数组类型的
  const start = new Date();
  start.setTime(start.getTime() - 24 * 60 * 60 * 1000);
  const end = new Date();
  return [start, end]
}
