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
const PaymentForm = ({onTabChange, createPayment}) =>{
    const [payment, setPayment] = useState('cash');
    const submitPayment = (value) => {
        if(payment === 'cash') {
            createPayment();
        }
        onTabChange(2);
    }
    return(
        <div>
            <Form
            {...layout}
            name="basic"
            labelAlign = "left"
            className = "hiring-form row"
            onFinish={submitPayment}
            >
            <Form.Item>
                <h5>Chọn phương thức thanh toán</h5>
                <Radio.Group defaultValue={'cash'} onChange={e=> setPayment(e.target.value)}>
                    <Space direction="vertical">
                    <Radio value={'visa'}>Visa</Radio>
                    <Radio value={'masterCard'}>Master Card</Radio>
                    <Radio value={'cash'}>Tiền mặt</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            { payment !== 'cash' && 
            <Fragment>
                <Form.Item
                name="cardNumber"
                label="Nhập mã số thẻ"
                rules={[{ required: true, message: 'invalid card number!' }]}
            >   
                <Input placeholder="Nhập số thẻ . . ."/>
            </Form.Item>

            <Form.Item
                name="name"
                label="Nhập tên chủ thẻ"
                rules={[{ required: true, message: 'invalid card owner!' }]}
            >
                <Input placeholder="Nhập tên chủ thẻ . . ."/>
            </Form.Item>
            <Form.Item
                className="col-6"
                name="name"
                label="CVC"
                rules={[{ required: true, message: 'invalid CVC!' }]}
            >
                <Input placeholder="Nhập cvc . . ." style={{width:"200px"}}/>
            </Form.Item>
            <Form.Item
                className="col-6"
                name="name"
                label="Expire date"
                rules={[{ required: true, message: 'invalid expire date!' }]}
            >
                <Input placeholder="Nhập ngày hết hạn . . ." style={{width:"200px"}}/>
            </Form.Item>
            </Fragment>
            }
            <Form.Item>
                <button className="button" type="submit">Xác nhận</button>
            </Form.Item>
            </Form>
        </div>
    )
}
export default PaymentForm