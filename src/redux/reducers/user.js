import {
  GET_USER_SUCCESS
} from '../action-types/user'
import {getItem} from '../../utils/storage'
const initUser = getItem(user) || {} //第一次需要，没有值就返回null
function user(prevState = initUser, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.data
    default:
      return prevState
  }
}

export default user;