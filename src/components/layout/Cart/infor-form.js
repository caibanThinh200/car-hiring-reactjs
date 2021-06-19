import { Form, Input, DatePicker, Space, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
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

const InforForm = ({onTabChange,getInfo}) => {
    const [form]= Form.useForm()
    const idUser = useSelector(state => state.user.idUser)
    const fullname = useSelector(state => state.user.name)
    const phoneNum = useSelector(state => state.user.phone)
    const mail = useSelector(state => state.user.mail)
    const address = useSelector(state => state.user.address)
    const [enableChange, setEnableChange] = useState(false);
    const { RangePicker } = DatePicker;

    useEffect(()=>{
        form.setFieldsValue({fullname,phoneNum, mail, address})
    },[]);

    const onChange = (value, dateString) => {
        getInfo({
            idUser: idUser,
            address: address,
            startDate: dateString[0],
            endDate: dateString[1]
        });
    }

    const onOk = (value) => {
        console.log('onOk: ', value);
    }
    
    const updateInfo = () => {
        if(window.confirm("Bạn muốn thay đổi thông tin ?")){
            setEnableChange(true);
        } 
    }
    const saveInfo = () => {
        if(window.confirm("Bạn muốn lưu thông tin mới ?")){
            setEnableChange(false);
            message.success("Thay đổi đã được lưu");
        }
    }
 
    const onFinish = (value) =>{
        getInfo(value)
        onTabChange(1)
    }

    const onChangeInfo = (e) => {
        getInfo({
            [e.target.name]: e.target.value
        });
    }
    
    const rangeConfig = {
        rules: [
          {
            type: 'array',
            required: true,
            message: 'Please select time!',
          },
        ],
      };
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
                <Input name="fullname" onChange={e => onChangeInfo(e)} disabled={!enableChange} defaultValue={fullname} />
            </Form.Item>
            <Form.Item
                name="mail"
                label="Địa chỉ email"
                rules={[{ required: true, message: 'Vui lòng nhập email' }]}
            >   
                <Input name="mail" onChange={e => onChangeInfo(e)} disabled={!enableChange} defaultValue={mail} />
            </Form.Item>
            <Form.Item
                name="phoneNum"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            >
                <Input name="phoneNum" onChange={e => onChangeInfo(e)} disabled={!enableChange} defaultValue={phoneNum} />
            </Form.Item>
            <Form.Item
                name="address"
                label="Địa chỉ đặt xe"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ thuê xe' }]}
            >
                <Input name="address" onChange={e => onChangeInfo(e)} disabled={!enableChange} defaultValue={address}/>
            </Form.Item>
            <Form.Item
                name="date"
                label="Lịch trình"
                {...rangeConfig}>
                    <RangePicker
                        name="date"
                        showTime={{ format: 'HH:mm' }}
                        format="YYYY-MM-DD HH:mm"
                        onChange={onChange}
                        onOk={onOk} />   
            </Form.Item>
            <Form.Item labelCol={0} wrapperCol={24} >
                <div className="row">
                    <div className="col-3 ">
                        <button className="button" disabled={!localStorage.getItem("cart")} type="submit" >Tiếp tục</button>
                    </div>
                    <div className="col-4">
                        <button type="button" hidden={enableChange} onClick={updateInfo} className="btn-edit-bill">Thay đổi thông tin</button>
                    </div>
                    <div className="col-4">
                        <button type="button" hidden={!enableChange} onClick={saveInfo} className="btn-edit-bill">Lưu thông tin</button>
                    </div>
                </div>
            </Form.Item>
            </Form>
        </div>
    )
}
export default InforForm