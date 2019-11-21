//定义请求方法的模块
import axiosInstance from './request'
//请求登录,箭头函数去掉花括号，默认加return
 export const reqLogin = (username, password) =>
  axiosInstance({
    method: 'POST',
    url: './login',
    data: {
      username,
      password
    }

  })