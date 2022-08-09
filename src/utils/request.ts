import axios from 'axios'
import {getJwtToken} from "./common-utils"
import {Message} from 'element-plus'

class HttpRequest {
    baseUrl:string 
  //构造函数
  constructor (baseUrl:string) {
    this.baseUrl = baseUrl
  }
  //针对axios实例的默认配置
  initConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }
  //创建并返回axios实例，options参数为创建实例时传递的个性化参数
  request (options:any) {
    const instance = axios.create();
    // request拦截器
    instance.interceptors.request.use(
    config => {
         //认证请求不需要携带令牌
        if(config.url !== "/authentication") {
            // 让每个请求携带token
            (config as any).headers['JWTHeaderName'] = getJwtToken();
        }
        return config;
    }
  ),
  instance.interceptors.response.use(
  response => {
    //统一处理状态
    const res = response.data;
    if(!res.success){
      //当成异常返回
      return Promise.reject(res);
    }else{
      return res;
    }
  },
  error => {
    if (error && error.response) {
       switch (error.response.status) {
           case 400:
               error.message = error.response.data.message;
               break;
           case 401:
               error.message = '未授权，请重新登录';
               break;
           case 403:
               error.message = '拒绝访问';
               break;
           case 404:
               error.message = '请求错误,未找到该资源';
               break;
           case 405:
               error.message = '请求方法未允许';
               break;
           case 408:
               error.message = '请求超时';
               break;
           case 500:
               error.message = error.response.data.message;;
               break;
           case 501:
               error.message = '网络未实现';
               break;
           case 502:
               error.message = '网络错误';
               break;
           case 503:
               error.message = '服务不可用';
               break;
           case 504:
               error.message = '网络超时';
               break;
           case 505:
               error.message = 'http版本不支持该请求';
               break;
           default:
               error.message = `未知错误${error.response.status}`;
       }
   } else {
       error.message = "连接到服务器失败";
   }
   return Promise.reject(error);
})
    //将默认配置与个性化配置整合。
    //如果二者发生冲突，个性化配置options，覆盖初始化默认配置initConfig()
    options = Object.assign(this.initConfig(), options)
    //在这里可以为axios实例instance设置拦截器
    return instance(options)
  }
  
  
}
export default HttpRequest