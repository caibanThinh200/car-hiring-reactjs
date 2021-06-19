import React, { Fragment, useState } from 'react'
import { Form, Input, Button, Checkbox, Modal, Spin } from 'antd';
import axios from 'axios'
import 'antd/dist/antd.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import FacebookLogin from 'react-facebook-login';

import '../styles/login.css'
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 18, color: 'white' }} spin />;
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
}
const tailLayout = {
    wrapperCol: {
        offset: 6,
        span: 16,
    },
}
const Login = () => {
    const headers = {
        'Content-Type': 'application/json',
        // 'Authorization': 'JWT fefege...'
    }
    const [load, setLoad] = useState(false)
    const onFinish = (values) => {
        console.log('Success:', values);
        setLoad(true)
        axios.post("https://mighty-meadow-74982.herokuapp.com/customer/login", values, { headers: headers })
            .then((res) => {
                console.log(res.data)
                if(res.data.data !=null){
                    axios.get('https://mighty-meadow-74982.herokuapp.com/customer/user/info', {
                        headers: {'Authorization': 'Bearer ' + res.data.data}
                    })
                    .then(response=>{
                        console.log(response.data.data)
                        Modal.success({
                            title: 'Đăng nhập thành công',
                            onOk() { 
                                if(response.data.data.role === 'admin'){
                                    localStorage.setItem('admin-token', res.data.data)
                                    window.location = "/admin"
                                }
                                else{
                                    localStorage.setItem('token', res.data.data);
                                    localStorage.getItem("idUser",res.data); 
                                    window.location = "/"; 
                                }
                            }
                        }, setLoad(false))
                    })
                }
                else {
                    Modal.error({
                        title: 'Email hoặc mật khẩu không đúng'
                    }, setLoad(false))
                }
            })
            .catch(err => console.log(err));
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const responseFacebook = (res) => {
        console.log(res);
        res.accessToken != null ? Modal.success({
            title: 'Đăng nhập thành công',
            onOk() { localStorage.setItem('fname', res.name);localStorage.setItem('fbtoken',res.accessToken); window.location = "/"; } 
        }, setLoad(false)) : Modal.error({
            title: 'Không thể đăng nhập bằng FaceBook'
        }, setLoad(false))
    }
    
    return (
        <Fragment>
            <Router>
                <div className="form-container login mb-5" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Switch>
                        <Route exact path="/login" render={() => (
                            <Form
                                {...layout}
                                name="basic"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                style={{ boxShadow: '1px 5px 15px rgba(0, 0, 0, 0.2)', width: '700px', padding: '20px 10px', background: 'white', borderRadius: '8px' }}
                                className="login mt-5"
                            >
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <p style={{ fontSize: '25px', fontWeight: 'bold', letterSpacing: '1px' }}>Đăng nhập</p>
                                </div>
                                <Form.Item
                                    label="E-mail"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                    className="field"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                    className="field"
                                >
                                    <Input.Password />
                                </Form.Item>
                                {/* facebook login  */}
                                
                                <Form.Item {...tailLayout} name="remember" valuePropName="checked" >
                                    <Checkbox style={{ color: 'black', display: 'flex' }}>Remember me</Checkbox>
                                    <Button style={{ background: 'black', width: '200px' }} htmlType="submit" className=" text-white mt-2 text-center">
                                        {load == true ? <Spin style={{ transform: 'translateX(-20px)translateY(-4px)' }} indicator={antIcon} /> : <span></span>}
                                    Đăng nhập
                                </Button>
                                </Form.Item>
                                <Form.Item {...tailLayout} style={{marginBottom:'0px'}}>
                                    <span>Bạn chưa có tài khoản?</span>
                                    <span style={{ cursor: 'pointer', color: 'orange', marginLeft: '10px' }} onClick={() => { window.location = "/sign-up" }}>
                                        Đăng ký ngay
                                    {/* <Link to="/sign-up">Đăng kí ngay</Link> */}
                                    </span>
                                </Form.Item>
                                <Form.Item {...tailLayout} className="bg-blue-700 text-blue-500 rounded-full">
                                    <p style={{fontSize:'14px', color:'gray'}} >Hoặc đăng nhập với</p>
                                    <FacebookLogin
                                        appId="270778087955847"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        callback={responseFacebook}
                                        cssClass="btn-fb"
                                        textButton="Facebook"
                                        icon="fab fa-facebook"
                                    />
                                </Form.Item>
                            </Form>

                        )} />
                        {/* <Route path="/sign-up" component={Register} /> */}
                    </Switch>
                </div>
            </Router>


        </Fragment>

    );

}
export default Login;