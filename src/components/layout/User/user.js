import React, { Fragment, useEffect, useState } from 'react'
import '../../../styles/user.css'
import UploadImage from './upload'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Form, Input, Table, Tabs, Tag, Descriptions, Modal, message } from 'antd';
import { Link } from 'react-router-dom'
import BillDetail from '../../BillDetail'
import UpLoadImage from './upload'
import CartItem from './cart-item'
const { TabPane } = Tabs;
const { Column } = Table
const layout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
        md: {
            span: 4
        }
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
        md: {
            span: 10
        }
    },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const UserPage = () => {
    let { id } = useParams();
    let fname = localStorage.getItem('name')
    const [bill, setBill] = useState([])
    const [render, setRender] = useState(0)
    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [listCar, setListCar] = useState([])
    const [total, setTotal] = useState(0)
    const [billDetail, setBillDetail] = useState({
        startDate: '',
        endDate: ''
    })
    const start = billDetail.startDate.replaceAll("-", " ").split(" ")[2]
    const end = billDetail.endDate.replaceAll("-", " ").split(" ")[2]
    const showDetail = (data) => {
        setBillDetail(data)
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/bill/${data.idBill}`)
                .then(res => {
                    console.log(res.data)
                    setListCar(res.data.vehicle)
                    let arr = []
                    let reduceType = (a, b) => a + b
                    res.data.vehicle.forEach(item => {
                        arr.push(item.price)
                    })
                    setTotal(arr.reduce(reduceType))
                })
        } catch (error) {
            console.log(error)
        }
        setVisible(true)
    }

    const onDeleteBill = (detail) => {
        try {
            axios.delete(`https://mighty-meadow-74982.herokuapp.com/bill/${detail}`)
                .then(res => {
                    if (res.data.status === 'SUCCESS') {
                        message.success('Huỷ thành công')
                        setDeleteVisible(false)
                        setVisible(false)
                        setRender(render + 1)
                    }
                    else message.error('Đã xảy ra lỗi, vui lòng kiểm tra lại')
                })
        } catch (error) {
            console.log(error)
            message.error('Đã xảy ra lỗi, vui lòng kiểm tra lại')
        }
    }
    const [user, setUser] = useState({});
    const [dis, setDis] = useState(true)

    useEffect(() => {
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/customer/${id}`)
                .then(response => {
                    setUser(response.data.data)
                })
            axios.get(`https://mighty-meadow-74982.herokuapp.com/bill/user?idUser=${id}`)
                .then(res => setBill(res.data.bill))
        }
        catch (error) {
            console.log(error)
        }
    }, [render])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4" style={{ padding: '0' }}>
                    <div className="avatar-container">
                        <img className="user-avatar" src={process.env.PUBLIC_URL + "/images/defaultAvatar.png"} alt="" />
                        <UpLoadImage></UpLoadImage>
                    </div>
                </div>
                <div className="col-md-8" style={{ padding: '0' }}>
                    <div className="bg-white user">
                        <h3>Họ tên: <span id="user-name">{user.fullname}</span></h3>
                        <p id="user-email"> {user.mail}<span> - Khách hàng thân thiết</span> </p>
                        <div className="star">
                            <span><i className="fas fa-star" /></span>
                            <span><i className="fas fa-star" /></span>
                            <span><i className="fas fa-star" /></span>
                        </div>
                        <div class="alert alert-secondary" style={{ marginTop: '20px' }} role="alert">
                            Tham gia vào {user.created_at}
                        </div>
                        <div className="user-infor">
                            <div className="infor">
                                <p><i class="fas fa-mobile-android-alt"></i>Số điện thoại: </p>
                                <p> {user.phoneNum} </p>
                            </div>
                            <div className="infor">
                                <p><i class="fal fa-calendar-alt"></i>Ngày sinh: </p>
                                <p> {user.birth} </p>
                            </div>
                            <div className="infor">
                                <p><i class="fal fa-address-card"></i>Chứng minh nhân dân: </p>
                                <p> {user.cmnd} </p>
                            </div>
                            <div className="infor">
                                <p><i class="far fa-map-marker-alt"></i>Địa chỉ: </p>
                                <p> Chưa có thông tin </p>
                            </div>
                            <div className="infor">
                                <p><i class="far fa-lock-alt"></i>Mật khẩu: </p>
                                <p> ******** </p>
                                <Link>Đổi mật khẩu</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 user-setting">
                    <Tabs size={'large'} defaultActiveKey="1" >
                        <TabPane tab={<span><i class="fal fa-user-edit"></i>Chỉnh sửa thông tin</span>} key="1">
                            <Form
                                {...layout}
                                name="basic"
                                className="edit-infor-form"
                                style={{ marginTop: '30px' }}
                                initialValues={{ remember: true }}
                            >
                                <Form.Item
                                    label="Tên khách hàng"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input disabled={dis} placeholder={user.fullname} />
                                </Form.Item>

                                <Form.Item
                                    label="Số điện thoại"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input disabled={dis} placeholder={user.phoneNum} />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input disabled={dis} placeholder={user.mail} />
                                </Form.Item>

                                <Form.Item
                                    label="Chứng minh nhân dân"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input disabled={dis} placeholder={user.cmnd} />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input disabled={dis} placeholder="" />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <button onClick={() => { setDis(false) }} type="button" className="btn btn-outline-success"><i class="fal fa-pen"></i>Chỉnh sửa </button>
                                    <button onClick={() => { setDis(!dis) }} className="btn btn-danger" disabled={dis}>Xác nhận</button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab={<span><i class="fal fa-history"></i>Lịch sử giao dịch<span style={{ marginLeft: '10px' }} class="badge bg-danger">{bill.length}</span></span>} key="2">
                            <Modal width={1000} footer={false} visible={visible} onCancel={() => setVisible(false)}>
                                <Descriptions title="Chi tiết đơn đặt" bordered>
                                    <Descriptions.Item label="Số điện thoại KH" >
                                        {billDetail.phone ? <span>{billDetail.phone}</span> : <span>0909123456</span>}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Trạng thái">
                                        {billDetail.status === "Waiting for admin" ? <Tag color="processing"> {billDetail.status} </Tag>
                                            : billDetail.status === "DONE" ? <Tag color="green"> {billDetail.status} </Tag> : <Tag color="gold"> {billDetail.status} </Tag>}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Số ngày" span={1}>
                                        {end - start}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ngày nhận">
                                        {billDetail.startDate}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ngày trả" span={2}>
                                        {billDetail.endDate}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="Địa chỉ" span={3}>
                                        {billDetail.place}
                                    </Descriptions.Item>
                                    {listCar.map(item => {
                                        return (
                                            <Fragment>
                                                <Descriptions.Item label="Tên xe"> {item.name} </Descriptions.Item>
                                                <Descriptions.Item label="Giá theo ngày" span={2}> {new Intl.NumberFormat().format(item.price)} VND</Descriptions.Item>
                                            </Fragment>
                                        )
                                    })}
                                    <Descriptions.Item label="Tổng tiền" span={2}>
                                        <h6 style={{ marginBottom: '0' }}><b>{new Intl.NumberFormat().format(total * (end - start))} VND</b></h6>
                                    </Descriptions.Item>
                                </Descriptions>
                                {billDetail.status === 'Waiting for admin' &&
                                    <div className="d-flex btn-confirm-container">
                                        <Modal visible={deleteVisible} footer={false} onCancel={() => setDeleteVisible(false)}>
                                            <h6>Bạn có chắc muốn huỷ đơn đặt</h6>
                                            <p className="mb-5">Nếu đồng ý hãy nhấn Ok </p>
                                            <div className="d-flex btn-confirm-container" style={{borderTop:'1px solid #eee'}}>
                                                <button className="btn-delete-rent" onClick={()=>setDeleteVisible(false)}>Đóng</button>
                                                <button className="btn-submit-rent ml-2" onClick={()=>onDeleteBill(billDetail.idBill)}>Đồng ý</button>
                                            </div>
                                        </Modal>
                                        <button onClick={() => setDeleteVisible(true)} className="btn-delete-rent">Huỷ đơn đặt</button>
                                    </div>
                                }
                            </Modal>

                            <Table
                                bordered
                                dataSource={bill}
                            >
                                <Column title="Ngày thuê" dataIndex="startDate" key="startDate" />
                                <Column title="Ngày trả" dataIndex="endDate" key="endDate" />
                                <Column title="Trạng thái" key="status"
                                    render={data => {
                                        if (data.status === "Waiting for admin")
                                            return <Tag color="processing"> {data.status} </Tag>
                                        if (data.status === "Done")
                                            return <Tag color="green"> {data.status} </Tag>
                                        else
                                            return <Tag color="gold"> {data.status} </Tag>
                                    }}
                                />
                                <Column title="Số điện thoại" key="total"
                                    render={data => (
                                        <span> {data.phone ? data.phone : "0909123456"} </span>
                                    )}
                                />
                                <Column title="Địa chỉ" dataIndex="place" key="place" />
                                <Column title="Hành động" key="action" width="120px"
                                    render={action => (
                                        <div className="d-flex">
                                            <button onClick={() => { showDetail(action) }} className="btn-detail">Chi tiết</button>
                                        </div>
                                    )}
                                />
                            </Table>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
export default UserPage