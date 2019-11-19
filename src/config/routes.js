import Home from '../components/home/index'
import Login from '../components/login/index'
import Notmatch from '../components/not-match/'
export default [{
    path: '/',
    component: Home,
    exact: true
  },

  {
    path: '/login',
    component: Login,
    exact: true
  },
  {
    component: Notmatch, //表示找不到页面的404必须放在最后 ,不写/表示匹配所有
  }
]