import Cookie from 'js-cookie';

class cacheData {

  static set(key, value) {
    Cookie.set(key, value, {path: '/', expires: 7});
    localStorage.setItem(key, value);
  }

  static setObj(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  }

  static get(key) {
    if (localStorage) {
      return localStorage.getItem(key);
    } else {
      return Cookie.get(key);
    }
  }

  static getObj(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static del(key) {
    Cookie.remove(key);
    localStorage.removeItem(key);
  }

  static remove(igons=[]) {
    localStorage.clear();
		
    let obj = Cookie.get();
    for (let c in obj){
      if (obj.hasOwnProperty(c) && !igons.some(i => i === c)) {
        Cookie.remove(c);
      }
    } 
  }
 

}

window.$Data = cacheData;
