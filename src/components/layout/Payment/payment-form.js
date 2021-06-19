import { Form, Input, Radio, Space } from 'antd';
import { Fragment, useState } from 'react';
const layout = {
    labelCol: { 
        sm:{
            span: 24
        }, 
        lg:{
            span: 24
        }
    },
    wrapperCol: {
         sm:{
            span: 24
        },
        lg:{
            span: 24
        }
    },
};
const PaymentForm = ({onTabChange}) =>{
    const [payment, setPayment] = useState('cash')
    return(
        <div>
            <Form
            {...layout}
            name="basic"
            labelAlign = "left"
            className = "hiring-form"
            >
            <Form.Item>
                <h5>Chọn phương thức thanh toán</h5>
                <Radio.Group defaultValue={'cash'} onChange={e=>setPayment(e.target.value)}>
                    <Space direction="vertical">
                    <Radio value={'visa'}>Visa</Radio>
                    <Radio value={'masterCard'}>Master Card</Radio>
                    <Radio value={'cash'}>Tiền mặt</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            {payment !== 'cash' && 
            <Fragment>
                <Form.Item
                name="username"
                label="Nhập mã số thẻ"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >   
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Nhập tên chủ thẻ"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input />
            </Form.Item>
            </Fragment>
            }
            <Form.Item>
                <button type="submit" onClick={()=>onTabChange(2)} >Xác nhận</button>
            </Form.Item>
            </Form>
        </div>
    )
}
export default PaymentForm