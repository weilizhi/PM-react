import React, { Component } from "react";
import { Form, Icon, Input, Button, message } from "antd";
import logo from "./logo.png";
import "./index.less";
import axios from "axios";
const { Item } = Form;
@Form.create()
class Login extends Component {
  validator = (rule, value, callback) => {
    const name = rule.field === "username" ? "用户名" : "密码";
    if (!value) {
      callback("请输入" + name);
    } else if (value.length < 6) {
      callback(name + "长度不能少于6位");
    } else if (value.length > 20) {
      callback(name + "长度不能大于20位");
    } else if (!/\w/.test(value)) {
      callback(name + "只能包含英文、数字和下划线");
    } else {
      callback(); //记得调用
    }
  };
  //登录，禁止默认行为
  login = e => {
    //缓存form
    const { form } = this.props;
    e.preventDefault();
    //表单校验通过才收集表单数据
    form.validateFields((err, values) => {
      if (!err) {
        //，校验通过，发送请求登录
        axios
          .post("http://localhost:5000/api/login", values)
          .then(response => {
            //请求成功，并不一定能登录成功（组件要放在render后调用）
            //通过判断Response 中data的值，看是否登录成功，成功0，失败1
            if (response.data.status === 0) {
              //说明登录成功
              this.props.history.push("/");
            } else {
              //登录失败，提示错误
              message.error(response.data.msg);
              //清空密码
              form.resetFields(["password"]);
            }
          })
          .catch(err => {
            //请求失败，登录失败
            message.error("网络故障，请刷新试试~~");
            //清空密码
            form.resetFields(["password"]);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img className="login-img" src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-section">
          <h3>用户登录</h3>
          <Form onSubmit={this.login}>
            <Item>
              {getFieldDecorator("username", {
                rules: [
                  /*{   { required: true, message: "请输入用户名!" },
                  {
                    min: 2,
                    message: "用户名长度不能少于2位"
                  },
                  {
                    max: 10,
                    message: "用户名长度不能大于10位"
                  },
                  {
                    pattern: /\w/,
                    message: "用户名只能包含数字，字母，下划线"
                  }

                 } */
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={<Icon type="user" className="login-icon" />}
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [
                  { validator: this.validator },
                  { required: true, message: "请输入密码!" }
                ]
              })(
                <Input
                  prefix={<Icon type="lock" className="login-icon" />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button className="login-btn" type="primary" htmlType="submit">
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}
export default Login;
