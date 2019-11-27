//根据prevState和action生成新的状态（NewState）
import {
  combineReducers
} from 'redux'
import user from './user'
import category from './category';
export default combineReducers({
  user,
  categories: category
})