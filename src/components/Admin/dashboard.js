import '../../styles/admin.css'
import { Form, Menu, Input, message } from 'antd';
import {
  AppstoreAddOutlined,
  DesktopOutlined,
  ContainerOutlined,
  EyeOutlined,
  PlusOutlined,
  CarOutlined,
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import Modal from 'antd/lib/modal/Modal';
import { useState } from 'react';
import axios from 'axios';
const { SubMenu } = Menu;
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const Dashboard = ({collapse}) =>{
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const onFinish = (value)=>{
    setVisible(false)
    try {
      axios.post("https://mighty-meadow-74982.herokuapp.com/manufactor", value)
        .then(res=>{
          console.log(res.data)
          if(res.data.status === 'SUCCESS'){
            form.setFieldsValue({name: ''})
            message.success('Đã thêm thành công')
            setVisible(false)
          }
          else {
            form.setFieldsValue({name: ''})
            message.error('Đã xảy ra lỗi, vui lòng thử lại!')
            setVisible(false)
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
    return(
        <Menu
          defaultSelectedKeys={'1'}
          defaultOpenKeys={['car', 'sub2','sub3']}
          mode="inline"
          theme="dark"
          inlineCollapsed = {collapse}
          collapsedWidth = "400px"
          style={{height: '100%', minHeight:'100vh'}}
        >
          <Modal title="Thêm hãng xe mới" width={600} footer={false} visible={visible} onCancel={()=>setVisible(false)}>
              <Form
                name="basic"
                {...layout}
                onFinish={onFinish}
                form={form}
              >
              <Form.Item
                label="Tên hãng"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên hãng xe',
                  },
                ]}
              >
                <Input size="large"/>
              </Form.Item>
              <Form.Item>
                <button className="btn-add-manu" type="submit"> Thêm</button>
              </Form.Item>
              </Form>
          </Modal>
          <Menu.Item key="0" className="bg-dark" disabled style={{cursor:'default', padding:'0 20px', margin:'0'}}>
              <h5 style={{margin:'0', height:'100%'}} className="text-light d-flex align-items-center">Dashboard</h5>
          </Menu.Item>
          <Menu.Item key="1" icon={<DesktopOutlined  />}>
            <Link to="/admin">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item onClick={()=>setVisible(true)} key="3" icon={<PlusOutlined/>}>
              <span>Thêm hãng xe mới</span>
          </Menu.Item>
          <SubMenu key="car" icon={<CarOutlined />} title="Quản lý xe">
            <Menu.Item key="5" icon={<EyeOutlined />}> <Link to="/admin/vehicle"> Xem danh sách xe</Link></Menu.Item>
            <Menu.Item key="6" icon={<AppstoreAddOutlined/>}><Link to="/admin/add-vehicle"> Thêm xe mới</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ContainerOutlined />} title="Quản lý đơn hàng">
            <Menu.Item key="9"><Link to="/admin/bill">Xem đơn đặt xe</Link></Menu.Item>
            <Menu.Item key="10">Xem hợp đồng</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<ContainerOutlined />} title="Biểu đồ">
            <Menu.Item key="11"><Link to="/admin/revenue-chart">Biểu đồ doanh thu</Link></Menu.Item>
            <Menu.Item key="12"><Link to="/admin/saled-chart">Biểu đồ bán chạy</Link></Menu.Item>
          </SubMenu>
        </Menu>
    );
}
export default Dashboard