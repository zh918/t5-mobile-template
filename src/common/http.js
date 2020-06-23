import axios from 'axios';
import Progress from './progress';

class http {
  static post(url, parms={}, headers={}, isToken=true) {
    let ran = Math.floor(Math.random() * 100);
    let option = Object.assign({}, { 'content-type': 'application/json; charset=utf-8', 'x-client-ajax': 1 }, headers);
    // if (isToken) {
    //   if ($Data.get('token')){
    //     Object.assign(option, {Authorization: $Data.get('token')});
    //   } else {
    //     globalVue.$router.push({path: '/login'});
    //   }
    // } else {
    //   if ($Data.get('token')){
    //     Object.assign(option, {Authorization: $Data.get('token')});
    //   } 
    // }
    
    var instance = axios.create({
      timeout: 1000 * 30,
      headers: option, 
      maxContentLength: 2000,
      withCredentials: false, 
      onUploadProgress: (progressEvent) => {
        // console.log('onUploadProgress',progressEvent)
        // globalVue.$emit('progress',progressEvent.percent);
      },
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total > 0) {
          progressEvent.percent = parseInt(progressEvent.loaded / progressEvent.total * 100);
        }
        // Progress.drawTopLine(progressEvent.percent)
      }
    });

    instance.defaults.headers.common['x-client-ajax'] = '1';
    instance.defaults.withCredentials = true;

    return instance.post(url, parms).then(function(res){
      if (res.data.code === 12) {
        globalVue.$message.error('登录超时或用户信息丢失，请重新登录');
      } else if (res.data.code === 14) {
        globalVue.$message.error(res.data.errorMsg);
      }

      return res.data;
    }).catch(res => {
      if (res.response.status === 418) {
        //这里是你想要用户登录成功后浏览器跳转回来的页面 location.origin 
        // location.href;
        const origin = location.href;
        location.href = `http://serverless-runtime-api.pagoda.com.cn/login?redirect=${encodeURIComponent(origin)}`;
        return;
      }

      if (res.toString().indexOf('Network Error')) {
        globalVue.$message.error('网络异常，系统发生错误');
      } else if (res.toString().indexOf('ERR_CONNECTION_TIMED_OUT')) {
        globalVue.$message.error('网络异常，链接超时');
      }
      return {};
    });

  }

  static get(url, parms={}, headers={}) {
    let ran = Math.floor(Math.random() * 100);

    let option = Object.assign({}, headers);
    if ($Data.get('token')){
      Object.assign(option, {Authorization: $Data.get('token')});
    } 
    // else {
    //        globalVue.$router.push({path:'/login'});
    // }
    var instance = axios.create({
      timeout: 1000 * 30,
      headers: option
    });

    return instance.get(url).then(function(res){

      if (res.data.errorCode !== 0){
        globalVue.$alert(res.data.errorMsg, '提示', {
          confirmButtonText: '确定'
        });
      }
      return res.data;
    }).catch(res => {
      console.log('error', res);
    });
  }
}

window.$http = http;
