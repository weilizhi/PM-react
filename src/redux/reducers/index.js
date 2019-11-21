//根据prevState和action生成新的状态（NewState）
import {combineReducers} from 'redux'
import user from './user'
export default combineReducers({
  user
})