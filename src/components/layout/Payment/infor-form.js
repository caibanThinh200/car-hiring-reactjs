import { Form, Input, DatePicker, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
const layout = {
    labelCol: { 
        sm:{
            span: 24
        }, 
        lg:{
            span: 8
        }
    },
    wrapperCol: {
         sm:{
            span: 24
        },
        lg:{
            span: 16
        }
    },
};
const onChange = (value, dateString) => {
    console.log(dateString);
  }
const onOk = (value) => {
    console.log('onOk: ', value);
  }
const { RangePicker } = DatePicker;

const InforForm = ({onTabChange}) =>{
    const onFinish = () =>{
        onTabChange(1)
    }
    const [form]= Form.useForm()
    const fullname = useSelector(state => state.user.name)
    const phoneNum = useSelector(state => state.user.phone)
    const mail = useSelector(state => state.user.mail)
    useEffect(()=>{
        form.setFieldsValue({fullname,phoneNum, mail})
    },[])
    return(
        <div>
            <Form
            {...layout}
            form = {form}
            name="basic"
            labelAlign = "left"
            className = "hiring-form"
            onFinish={onFinish}
            >

            <Form.Item
                name="fullname"
                label="Tên khách hàng"
                rules={[{ required: true, message: 'Vui lòng nhập tên của anh/chị' }]}
            >   
                <Input defaultValue={fullname} />
            </Form.Item>
            <Form.Item
                name="mail"
                label="Địa chỉ email"
                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
            >   
                <Input defaultValue={mail} />
            </Form.Item>
            <Form.Item
                name="phoneNum"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
                <Input defaultValue={phoneNum} />
            </Form.Item>
            <Form.Item
                name="address"
                label="Địa chỉ đặt xe"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ thuê xe' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="date"
                label="Lịch trình"
                rules={[{ required: false, message: 'Vui lòng chọn thời gian' }]}
            >
                <Space direction="vertical" size={12} onChange={onChange} onOk={onOk}>
                    <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    onChange={onChange}
                    onOk={onOk}
                    />
                </Space>
            </Form.Item>
            <Form.Item labelCol={0} wrapperCol={24} >
                    <div className="d-flex justify-content-start ">
                        <button type="submit" >Tiếp tục</button>
                    </div>
            </Form.Item>
            </Form>
        </div>
    )
}
export default InforForm