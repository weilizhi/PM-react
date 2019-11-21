//用来创建action对象
//(同步action creator对象返回值：是action对象
//异步action creator)：返回值是一个函数，在函数中完成异步操作
import {
  reqLogin
} from '../../api/'
import {GET_USER_SUCCESS} from '../action-types/user'
//异步action,不需要使用，无需暴露内容
const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  data: user
})
//异步action
export const getUserAsync = (username, password) => {
  return (dispatch) => {
    //异步操作
   return reqLogin(username, password)
      .then((response) => {
        //创建 action对象
        const action = getUserSuccess(response)
        //调用dispatch方法,最终会触发更新
        dispatch(action)
        return response //需要返回这个response。才能在存储用户数据的时候有值
      })

  }
}