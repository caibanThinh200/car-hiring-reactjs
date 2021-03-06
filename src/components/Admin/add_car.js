import { Form, Input, InputNumber, Select, Modal } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios'
const { Option } = Select
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 12 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const AddCar = () => {
    const [form] = Form.useForm();
    const [category, setCategory] = useState([])
    const [brand,setBrand] = useState([])

    const getCategoryData = () =>{
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/cate")
                .then(response=>{
                    setCategory(response.data.data)
                })
        } catch (error) {
            console.log(error)
        }
    }
    const getManufactorData = () =>{
        try {
            axios.get("https://mighty-meadow-74982.herokuapp.com/manufactor")
            .then(response=>{
                setBrand(response.data.data)
                console.log(response.data.data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{                                                         
        getCategoryData();
        getManufactorData();
    },[])
    
    const handleCreateCar = (value) =>{
        try {
            const {name, price, quantity, image} = value;
            const data = {
                name,
                price,
                quantity,
                image,
                idManufactor: value.idManufactor.value,
                idCategory: value.idCategory.value
            }
            console.log(data)
            axios.post('https://mighty-meadow-74982.herokuapp.com/vehicle', data)
                .then(response=>{
                    Modal.success({
                        content: response.data.result,
                        onOk: ()=>{
                            const obj ={
                                name: '',
                                price: '',
                                quantity: '',
                                idManufactor: '',
                                idCategory: '',
                                image: ''
                            }
                              form.setFieldsValue(obj)
                        }
                    })
                    console.log(response)
                })
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="container component">
            <div className="row" >
                <div className="form">
                    <Form
                        {...layout}
                        name="basic"
                        style={{backgroundColor: '#fff',boxShadow:'1px 5px 15px rgba(0, 0, 0, 0.2)', borderRadius:'7px', overflow:'hidden',margin:'auto', maxWidth:'700px'}}
                        initialValues={{ remember: false }}
                        form={form}
                        onFinish={handleCreateCar}
                    >
                        <Form.Item className="form-header"><h5>Th??m xe m???i</h5></Form.Item>
                        <Form.Item
                            label="T??n xe"
                            name="name"
                            rules={[{ required: true, message: 'Vui l??ng nh???p t??n xe' }]}
                        >
                            <Input  placeholder="Nh???p t??n xe"/>
                        </Form.Item>
                        <Form.Item
                            label="Gi??"
                            name="price"
                            rules={[{ required: true, message: 'Vui l??ng nh???p gi?? ti???n' }]}
                        >
                            <InputNumber placeholder="Nh???p gi?? ti???n"  style={{width:'40%'}} />
                        </Form.Item>
                        <Form.Item
                            label="S??? l?????ng"
                            name="quantity"
                            rules={[{ required: true, message: 'Vui l??ng nh???p s??? l?????ng xe' }]}
                        >
                            <InputNumber placeholder="Nh???p s??? l?????ng xe"  style={{width:'40%'}}  />
                        </Form.Item>
                        <Form.Item
                            label="H??nh ???nh"
                            name="image"
                            rules={[{ required: true, message: 'Vui l??ng nh???p URL h??nh' }]}
                        >
                            <Input  placeholder="Nh???p h??nh ???nh"/>
                        </Form.Item>

                        <Form.Item
                            label="S??? ch??? ng???i"
                            name="idCategory"
                            rules={[{ required: true, message: 'Vui l??ng ch???n s??? ch??? ng???i' }]}
                        >
                            <Select
                                labelInValue
                                placeholder="S??? ch???"
                                name="idCategory"
                            >
                                {category.map((idCategory, index)=>(
                                    <Option key={index} value={idCategory.idCategory} >{idCategory.nameCate} ch???</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                            label="H??ng s???n xu???t"
                            name="idManufactor"
                            rules={[{ required: true, message: 'Vui l??ng ch???n h??ng xe' }]}
                        >
                            <Select
                                labelInValue
                                placeholder="H??ng s???n xu???t"
                                name="idManufactor"
                            >
                                {brand.map((id, index)=>(
                                    <Option key={index} value={id.idManufactor}> {id.name} </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <button className="btn-add">Th??m xe</button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default AddCar