//封装axios
import axios from 'axios'
import codeMessage from '../config/code-message'
import {
  message
} from 'antd'
import store from '../redux/store'
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", //  基础路径，所有请求的公共路径
  timeout: 5000, //请求响应时间
  headers: {
    // 'content-type': 'application/x-www-form-urlencoded'，公共的请求头参数，因为token值是空的，所以有值会报错
  }
});
//设置拦截器(分类：请求拦截器，响应拦截器)
//interceptors.request.use请求拦截器的固定写法
axiosInstance.interceptors.request.use(
  config => {
    //功能，修改请求信息  (注意post请求的content-type不一定是默认的，不是默认的额就需要加代码‘content-type’)
    if (config.method === "post") {
      config.headers["content-type"] =
        "application/x-www-form-urlencoded";
      //修改data数据,写成Urlenconde，因为data是个对象,现在是一个数组，需要变成字符串，利用数组的方法：reduce
      config.data = Object.keys(config.data)
        .reduce((prev, key) => {
          const value = config.data[key];
          //拼接
          return prev + `&${key}=${value}`;
        }, "")
        .substring(1);
    }
    //先解构赋值提取user，再解构赋值提取token数据，从redux 中读取user状态数据
    const {
      user: {
        token
      }
    } = store.getState();
    if (token) {
      config.headers.authorization = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
//设置响应拦截
axiosInstance.interceptors.response.use(
  //响应成功触发的回调函数,解构赋值得到data， 之前是response ，解构之后可以去掉response
  ({
    data
  }) => {
    //处理成功的回调
    if (data.status === 0) {
      return data.data;
    } else {
      //功能失败，返回的是一个promise的失败的信息
      message.error(data.msg)
      return Promise.reject(data.msg);
    }
  },
  //响应失败触发的回调函数失败的原因有很多种
  /*
    服务器没开 Network Error ---> error.message
    请求超时 timeout of 1000ms exceeded 
    没网 Network Error
    error.response 如果有值，服务器返回了响应 / 如果没有值，服务器没有返回响应
    error.response.status 401 没有携带token
    401 token过期或无效
    404 资源找不到
    403 禁止访问
    500 服务器内部错误
  */
  (error) => {

    let errorMessage = '';
    if (error.response) {
      errorMessage = codeMessage[error.response.status] || "未知错误"; //无值是时为未知错误，有值就为codMessage中定义的值
    } else {
      if (error.message.indexOf("Network Error") !== -1) {
        errorMessage = "请检查网络连接";
      } else if (error.message.indexOf("timeout") !== -1) {
        errorMessage = "网络请求超时";
      } else {
        errorMessage = '未知错误'; //最终返回的还是未知错误
      }
    }
    //console.dir(error);
    message.error(errorMessage ); //拦截器中统一提示错误
    return Promise.reject(errorMessage);
  }
);
export default axiosInstance; //暴露创建的实例对象