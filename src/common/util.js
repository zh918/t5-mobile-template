import shortid from 'shortid';

// 工具函数

class Util {
  /**
   * 是否为安全整数
   */
  static IsInt(val, num, event) {
    if (val === null) {
      return false; 
    }

    let code = val.charCodeAt(0);
    let flag = Number.isSafeInteger(parseInt(num));

    return (48 <= code && code <= 57) && flag;
  }

  /**
   * 是否为浮点
   */
  static IsFloat(val, num, event) {
    if (val === null) {
      return false; 
    }

    let code = val.charCodeAt(0);
    if (num !== null || num !== undefined) {
      let point = num.split('.').length;
      if (point > 2) {
        return false; 
      }
    }

    return (48 <= code && code <= 57) || code === 46;
  }

  /**
   * 是否为数字
   */
  static IsNumber(val, num, event) {
    if (val === null) {
      return false; 
    }

    let code = val.charCodeAt(0);
    return (48 <= code && code <= 57);
  }

  static CountDown(starDateTime, endDateTime) {

    let result = {
      day: 0,
      hour: 0,
      minutes: 0,
      seconds: 0,
      code: 1,
      msg: ''
    };

    try {


      let temp_star = starDateTime.split(' ');
      let temp_end = endDateTime.split(' ');

      let star_ymd = temp_star[0].split('-');
      let star_hms = temp_star[1].split(':');

      let end_ymd = temp_end[0].split('-');
      let end_hms = temp_end[1].split(':');
      // debugger
      let star_y = Number(star_ymd[0]);
      let star_m = Number(star_ymd[1]) - 1;
      let star_d = Number(star_ymd[2]);

      let star_h = Number(star_hms[0]);
      let star_min = Number(star_hms[1]); 
      let star_s = Number(star_hms[2]);

      let end_y = Number(end_ymd[0]);
      let end_m = Number(end_ymd[1]) - 1;
      let end_d = Number(end_ymd[2]);

      let end_h = Number(end_hms[0]);
      let end_min = Number(end_hms[1]);
      let end_s = Number(end_hms[2]); 

      starDateTime = new Date(star_y, star_m, star_d, star_h, star_min, star_s);
      endDateTime = new Date(end_y, end_m, end_d, end_h, end_min, end_s); 


      if (starDateTime === undefined && endDateTime === undefined) {
        result.code = -10;
        result.msg = "参数错误";
        return result;
      }

      let currentDateTime = Date.now(); 
      let rangeDateTime = null;

      if (currentDateTime < starDateTime) {
        rangeDateTime = (starDateTime - currentDateTime);
        result.code = -1;
        result.msg = "未开始";
        result = Object.assign({}, result, _computeTime(rangeDateTime));
        return result;
      } else if (endDateTime <= currentDateTime) {
        result.code = 2;
        result.msg = "已结束";
        return result;
      } else { 
        rangeDateTime = (endDateTime - currentDateTime);
        result = Object.assign({}, result, _computeTime(rangeDateTime));
        // console.log(result)
        return result;
      }
 
    } catch (e) {
      return result;
    }


    function _computeTime(rangeT) {
      let temp = {
        day: 0,
        hour: 0,
        minutes: 0,
        seconds: 0,  
        totalSeconds: 0,
        formatMsg: ''
      };

      let day = Math.floor(rangeT / 86400000);
      rangeT -= day * 86400000; 

      let hour = Math.floor(rangeT / 3600000);
      rangeT -= hour * 3600000; 

      let minutes = Math.floor(rangeT / 60000);
      rangeT -= minutes * 60000; 

      let seconds = Math.floor(rangeT / 1000).toFixed(0);
      rangeT -= seconds * 1000; 

      temp.totalSeconds = Number(hour * 60 * 60) + Number(minutes * 60) + Number(seconds);

      if (hour < 10) {
        hour = "0" + hour; 
      }
      if (minutes < 10) {
        minutes = "0" + minutes; 
      }
      if (seconds < 10) {
        seconds = "0" + seconds; 
      }

      temp.day = day;
      temp.hour = hour;
      temp.minutes = minutes;
      temp.seconds = seconds;
      // temp.msg = `${day}天${hour}小时${minutes}分${seconds}秒`;
      temp.formatMsg = ` ${day}天${hour}:${minutes}:${seconds}`;

      let totalHour = (day * 24) + Number(hour);
      temp.formatMsg1 = ` ${totalHour}:${minutes}:${seconds}`;

      return temp;
    }

  }
 
  static IsIos() {
    const u = navigator.userAgent;
    return u.indexOf("iPhone") > -1 || u.indexOf("Mac OS") > -1;
  }

  static deepCopy(obj, cache = []) {
    // just return if obj is immutable value
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
    
    // if obj is hit, it is in circular structure
    const hit = find(cache, c => c.original === obj);
    if (hit) {
      return hit.copy;
    }
    
    const copy = Array.isArray(obj) ? [] : {};
    // put the copy into cache at first
    // because we want to refer it in recursive deepCopy
    cache.push({
      original: obj,
      copy
    });

    Object.keys(obj).forEach(key => {
      copy[key] = Util.deepCopy(obj[key], cache);
    });

    return copy;
  }

  static generate(key) {
    let obj = $Data.get(key);
    if (obj) {
      return obj;
    } else {
      let uid = shortid.generate();
      $Data.set(key, uid);
      return uid;
    }
  }

}

window.util = Util;
