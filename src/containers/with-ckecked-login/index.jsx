import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
//高阶函数的特点是传两个（）（组件）接收一个组件返回一个新组件
const withCheckLogin = WrappedComponent => {
  return connect(
    state => ({ token: state.user.token }),
    null
  )(
    class extends Component {
      static displayName = `ChekLogin(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        Component})`;
      render() {
        /*检查用户是否登录，情况：1，登录过，就要跳转去home页面， 
    2，如果没有登录过，需要去登录页面  那么怎么判断用户当前是在那个页面
    定义高阶组件，是为了复用，因为以后不一定是一个页面的跳转
    路由router的三大属性：lacation,history,match
    */
        //存储
        // const { pathname }= this.props.location.pathname;
        const { token, location, ...rest } = this.props;
        if (location.pathname === "/login") {
          //如果token存在，说明已经登录过了，可以直接跳转到home页面
          if (token) {
            return <Redirect to="/" />;
          }
          //组件connect
        } else {
          //如果没有登录过是没有token的，应该跳转到登录页面
          if (!token) {
            return <Redirect to="/login" />;
          }
        }
        //定义高阶组件的时候，看面的需不需要用到其接收到的props属性，需要就要往下传递的
        return <WrappedComponent {...rest} location={location} />;
      }
    }
  );
  // return NewComponent;
};
export default withCheckLogin; //代表是不会改变当前页面的路径，不会跳转
