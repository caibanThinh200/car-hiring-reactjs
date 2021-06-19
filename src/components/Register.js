import React, { Fragment, useState } from 'react'
import { Form, Input, Checkbox, Button, message, DatePicker } from 'antd';
import Select from 'react-select'
import axios from 'axios';
import 'antd/dist/antd.css';
const license = [
      { value: 'A1', label:'A1'},
      { value: 'A2',label:'A2' },
      { value: 'B1',label:'B1'},
      { value: 'B2',label:'B2'},
      { value: 'C',label:'C' },
      { value: 'D', label:'D'},

]

const formItemLayout = {
      labelCol: {
            xs: {
                  span: 24,
            },
            sm: {
                  span: 8,
            },
      },
      wrapperCol: {
            xs: {
                  span: 24,
            },
            sm: {
                  span: 12,
            },
      },
};
const tailFormItemLayout = {
      wrapperCol: {
            xs: {
                  span: 50,
                  offset: 8,
            },
            // sm: {
            //       span: 16,
            //       offset: 8,
            // },
      },
};
const {Option} = Select

const Register = () => {
      const [form] = Form.useForm();
      const headers = {
            'Content-Type': 'application/json',
          }
      const handleSubmit = (values) => {
            console.log(values)
             axios.post("https://mighty-meadow-74982.herokuapp.com/customer", values, {headers:headers})
                  .then((res) => {
                        message.success(res.data.result);
                        // window.location = "/login"
                  })
                  .catch(err => console.log(err));
      };

      return (
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'50px'}}>
                        <Form {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={handleSubmit}
                        scrollToFirstError
                        className="items-center bg-black w3/4 mt-5"
                        style={{boxShadow: '1px 5px 15px rgba(0, 0, 0, 0.2)', width:'700px', padding: '30px 10px', background:'white', borderRadius:'8px'}}
                  >
                        <div style={{width: '100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                <p style={{fontSize: '25px', fontWeight:'bold', letterSpacing:'1px'}}>Đăng ký</p>
                            </div>
                        <Form.Item
                              name="fullname"
                              label="Họ và Tên"
                              tooltip="bạn muốn người khác gọi bạn là gì?"
                              className="w-full px-1"
                              rules={[
                                    {
                                          required: true,
                                          message: 'Hãy nhập tên của bạn',
                                          whitespace: true,
                                    },
                              ]}
                        >
                              <Input className="1" />
                        </Form.Item>
                        <Form.Item
                              name="license"
                              label="Loại Bằng Lái"
                              className="px-1"
                              rules={[
                                    {
                                          type: 'array',
                                          required: true,
                                          message: 'vui lòng chọn bằng lái ',
                                    },
                              ]}
                        >
                              <Select
                                    defaultValue={[""]}
                                    isMulti
                                    name="colors"
                                    options={license}
                                    className="w-100"
                                    classNamePrefix="select"
                              />
                        </Form.Item>
                        <Form.Item
                              name="mail"
                              className
                              label="E-mail"
                              rules={[
                                    {
                                          type: 'email',
                                          message: 'The input is not valid E-mail!',
                                    },
                                    {
                                          required: true,
                                          message: 'Please input your E-mail!',
                                    },
                              ]}
                        >
                              <Input className="3" />
                        </Form.Item>
                        <Form.Item
                              name="phoneNum"
                              label="Phone Number"
                              rules={[
                                    {
                                          required: true,
                                          message: 'Please input your phone number!',
                                    },
                              ]}
                              
                        >
                              <Input
                              // addonBefore={prefixSelector}
                              />
                        </Form.Item>
                        <Form.Item
                              name="birth"
                              label="Sinh ngày"
                              // tooltip="What do you want others to call you?"
                              rules={[
                                    {
                                          required: true,
                                          message: 'Please input birth!',
                                    },
                              ]}
                        >
                              <DatePicker/>
                        </Form.Item>
                        <Form.Item
                              name="cmnd"
                              label="Chứng Minh Nhân Dân"
                              // tooltip="What do you want others to call you?"
                              rules={[
                                    {
                                          required: true,
                                          message: 'Please input your nickname!',
                                          // whitespace: true,
                                    },
                              ]}
                        >
                              <Input  />
                        </Form.Item>
                        <Form.Item
                              name="password"
                              label="Password"
                              rules={[
                                    {
                                          required: true,
                                          message: 'Please input your password!',
                                    },
                              ]}
                              hasFeedback
                        >
                              <Input.Password />
                        </Form.Item>
                        <Form.Item
                              name="confirm"
                              label="Confirm Password"
                              dependencies={['password']}
                              hasFeedback
                              rules={[
                                    {
                                          required: true,
                                          message: 'Please confirm your password!',
                                    },
                                    ({ getFieldValue }) => ({
                                          validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                      return Promise.resolve();
                                                }

                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                          },
                                    }),
                              ]}
                        >
                              <Input.Password />
                        </Form.Item>
                        <Form.Item
                              name="agreement"
                              valuePropName="checked"
                              rules={[
                                    {
                                          validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                    },
                              ]}
                              {...tailFormItemLayout}
                        >
                              <Checkbox>
                                    I have read the <a href="" style={{color:'red'}}>agreement</a>
                              </Checkbox>
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                              <Button  style={{width:'200px', borderStyle: 'none', background:'tan', color:'white'}} htmlType="submit">
                                    Register
                              </Button>
                        </Form.Item>

                  </Form>
                  </div>
      )
}
export default Register