
/*
 *日期格式化
 * @param date 日期对象或13位时间戳
 * @param format 'yyyy-MM-dd' 格式标准
 */
function date_Format(date, format) {
  if (date === 0) {
    return '';
  }
  const dateObj = new Date(date);
  const map = {
    M: dateObj.getMonth() + 1, // 月份
    d: dateObj.getDate(), // 日
    h: dateObj.getHours(), // 24小时制
    H: dateObj.getHours() % 12, // 12小时制
    k: dateObj.getHours() > 12 ? 'PM' : 'AM',
    m: dateObj.getMinutes(), // 分
    s: dateObj.getSeconds(), // 秒
    q: Math.floor((dateObj.getMonth() + 3) / 3), // 季度
    S: dateObj.getMilliseconds(), // 毫秒
  };
  const str = format.replace(/([yMdhHkmsqS])+/g, function(all, t) {
    let v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (dateObj.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return str;
}
/*
 * 获取当前时间 按格式化输出
 * @param format 'yyyy-MM-dd' 格式标准
 */
function getCurrentDate(format) {
  return date_Format(new Date(), !format ? 'yyyy-MM-dd' : format);
}
/*
 * 判断是否闰年
 * @param year year
 */
function is_leap(year) {
  return !!(year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0));
}
/*
 * 一年中所有月的天数
 */
function m_days(year) {
  return [ 31, 28 + (is_leap(year) ? 1 : 0), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
}
/*
 * 月份第一天是周几
 * @param date 默认当前时间
 */
function firstDay(date) {
  const dateObj = new Date(date || new Date());
  dateObj.setDate(1);
  return dateObj.getDay();
}
/*
 * 返回下一个月
 * @param date 默认当前时间
 */
function nextMonth(date, format) {
  const dateObj = new Date(date || new Date());
  dateObj.setMonth(dateObj.getMonth() + 1);
  return date_Format(dateObj, !format ? 'yyyy-MM' : format);
}
/*
 * 返回上一个月
 * @param date 默认当前时间
 */
function lastMonth(date, format) {
  const dateObj = new Date(date || new Date());
  dateObj.setMonth(dateObj.getMonth() - 1);
  return date_Format(dateObj, !format ? 'yyyy-MM' : format);
}
/*
 * 根据年月获取月份天数
 * @param date 默认当前时间
 */
function getDayForMonth(date) {
  const dateObj = new Date(date || new Date());
  dateObj.setMonth(dateObj.getMonth() + 1);
  dateObj.setDate(0);
  return dateObj.getDate();
}
/*
 * @param dateString  2018-01-24 11:05
 * @return date
 */
function dateParse(dateString) {
  const curDate = dateString.replace(/-/g, '/');
  return new Date(Date.parse(curDate));
}
/*
 *日期计算
 * @param {string} interval 字符串，计量单位，例：年：'y'
 *     支持的模式字母有：
 *     y:年,
 *     M:年中的月份(1-12),
 *     d:月份中的天(1-31),
 *     h:小时(0-23),
 *     m:分(0-59),
 *     s:秒(0-59),
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @param {Number} number 要添加的数值
 * @param {dateObj} date 日期对象
 * @return {dateObj}
 */
function dateAdd(interval, number, date) {
  switch (interval) {
    case 'y': {
      date.setFullYear(date.getFullYear() + number);
      return date;
    }
    case 'q': {
      date.setMonth(date.getMonth() + number * 3);
      return date;
    }
    case 'M': {
      date.setMonth(date.getMonth() + number);
      return date;
    }
    case 'w': {
      date.setDate(date.getDate() + number * 7);
      return date;
    }
    case 'd': {
      date.setDate(date.getDate() + number);
      return date;
    }
    case 'h': {
      date.setHours(date.getHours() + number);
      return date;
    }
    case 'm': {
      date.setMinutes(date.getMinutes() + number);
      return date;
    }
    case 's': {
      date.setSeconds(date.getSeconds() + number);
      return date;
    }
    default: {
      throw console.error('interval is requied');
    }
  }
}

// 日期格式化
const dateFormat = function(date, format) {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
};

const utils = {
  date_Format,
  getCurrentDate,
  is_leap,
  m_days,
  firstDay,
  lastMonth,
  nextMonth,
  getDayForMonth,
  dateParse,
  dateAdd,
  dateFormat,
};

export default utils
