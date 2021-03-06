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
                        message.success('Hu??? th??nh c??ng')
                        setDeleteVisible(false)
                        setVisible(false)
                        setRender(render + 1)
                    }
                    else message.error('???? x???y ra l???i, vui l??ng ki???m tra l???i')
                })
        } catch (error) {
            console.log(error)
            message.error('???? x???y ra l???i, vui l??ng ki???m tra l???i')
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
                        <h3>H??? t??n: <span id="user-name">{user.fullname}</span></h3>
                        <p id="user-email"> {user.mail}<span> - Kh??ch h??ng th??n thi???t</span> </p>
                        <div className="star">
                            <span><i className="fas fa-star" /></span>
                            <span><i className="fas fa-star" /></span>
                            <span><i className="fas fa-star" /></span>
                        </div>
                        <div class="alert alert-secondary" style={{ marginTop: '20px' }} role="alert">
                            Tham gia v??o {user.created_at}
                        </div>
                        <div className="user-infor">
                            <div className="infor">
                                <p><i class="fas fa-mobile-android-alt"></i>S??? ??i???n tho???i: </p>
                                <p> {user.phoneNum} </p>
                            </div>
                            <div className="infor">
                                <p><i class="fal fa-calendar-alt"></i>Ng??y sinh: </p>
                                <p> {user.birth} </p>
                            </div>
                            <div className="infor">
                                <p><i class="fal fa-address-card"></i>Ch???ng minh nh??n d??n: </p>
                                <p> {user.cmnd} </p>
                            </div>
                            <div className="infor">
                                <p><i class="far fa-map-marker-alt"></i>?????a ch???: </p>
                                <p> Ch??a c?? th??ng tin </p>
                            </div>
                            <div className="infor">
                                <p><i class="far fa-lock-alt"></i>M???t kh???u: </p>
                                <p> ******** </p>
                                <Link>?????i m???t kh???u</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 user-setting">
                    <Tabs size={'large'} defaultActiveKey="1" >
                        <TabPane tab={<span><i class="fal fa-user-edit"></i>Ch???nh s???a th??ng tin</span>} key="1">
                            <Form
                                {...layout}
                                name="basic"
                                className="edit-infor-form"
                                style={{ marginTop: '30px' }}
                                initialValues={{ remember: true }}
                            >
                                <Form.Item
                                    label="T??n kh??ch h??ng"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input disabled={dis} placeholder={user.fullname} />
                                </Form.Item>

                                <Form.Item
                                    label="S??? ??i???n tho???i"
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
                                    label="Ch???ng minh nh??n d??n"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input disabled={dis} placeholder={user.cmnd} />
                                </Form.Item>
                                <Form.Item
                                    label="?????a ch???"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input disabled={dis} placeholder="" />
                                </Form.Item>
                                <Form.Item {...tailLayout}>
                                    <button onClick={() => { setDis(false) }} type="button" className="btn btn-outline-success"><i class="fal fa-pen"></i>Ch???nh s???a </button>
                                    <button onClick={() => { setDis(!dis) }} className="btn btn-danger" disabled={dis}>X??c nh???n</button>
                                </Form.Item>
                            </Form>
                        </TabPane>
                        <TabPane tab={<span><i class="fal fa-history"></i>L???ch s??? giao d???ch<span style={{ marginLeft: '10px' }} class="badge bg-danger">{bill.length}</span></span>} key="2">
                            <Modal width={1000} footer={false} visible={visible} onCancel={() => setVisible(false)}>
                                <Descriptions title="Chi ti???t ????n ?????t" bordered>
                                    <Descriptions.Item label="S??? ??i???n tho???i KH" >
                                        {billDetail.phone ? <span>{billDetail.phone}</span> : <span>0909123456</span>}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Tr???ng th??i">
                                        {billDetail.status === "Waiting for admin" ? <Tag color="processing"> {billDetail.status} </Tag>
                                            : billDetail.status === "DONE" ? <Tag color="green"> {billDetail.status} </Tag> : <Tag color="gold"> {billDetail.status} </Tag>}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="S??? ng??y" span={1}>
                                        {end - start}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ng??y nh???n">
                                        {billDetail.startDate}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Ng??y tr???" span={2}>
                                        {billDetail.endDate}
                                    </Descriptions.Item>

                                    <Descriptions.Item label="?????a ch???" span={3}>
                                        {billDetail.place}
                                    </Descriptions.Item>
                                    {listCar.map(item => {
                                        return (
                                            <Fragment>
                                                <Descriptions.Item label="T??n xe"> {item.name} </Descriptions.Item>
                                                <Descriptions.Item label="Gi?? theo ng??y" span={2}> {new Intl.NumberFormat().format(item.price)} VND</Descriptions.Item>
                                            </Fragment>
                                        )
                                    })}
                                    <Descriptions.Item label="T???ng ti???n" span={2}>
                                        <h6 style={{ marginBottom: '0' }}><b>{new Intl.NumberFormat().format(total * (end - start))} VND</b></h6>
                                    </Descriptions.Item>
                                </Descriptions>
                                {billDetail.status === 'Waiting for admin' &&
                                    <div className="d-flex btn-confirm-container">
                                        <Modal visible={deleteVisible} footer={false} onCancel={() => setDeleteVisible(false)}>
                                            <h6>B???n c?? ch???c mu???n hu??? ????n ?????t</h6>
                                            <p className="mb-5">N???u ?????ng ?? h??y nh???n Ok </p>
                                            <div className="d-flex btn-confirm-container" style={{borderTop:'1px solid #eee'}}>
                                                <button className="btn-delete-rent" onClick={()=>setDeleteVisible(false)}>????ng</button>
                                                <button className="btn-submit-rent ml-2" onClick={()=>onDeleteBill(billDetail.idBill)}>?????ng ??</button>
                                            </div>
                                        </Modal>
                                        <button onClick={() => setDeleteVisible(true)} className="btn-delete-rent">Hu??? ????n ?????t</button>
                                    </div>
                                }
                            </Modal>

                            <Table
                                bordered
                                dataSource={bill}
                            >
                                <Column title="Ng??y thu??" dataIndex="startDate" key="startDate" />
                                <Column title="Ng??y tr???" dataIndex="endDate" key="endDate" />
                                <Column title="Tr???ng th??i" key="status"
                                    render={data => {
                                        if (data.status === "Waiting for admin")
                                            return <Tag color="processing"> {data.status} </Tag>
                                        if (data.status === "Done")
                                            return <Tag color="green"> {data.status} </Tag>
                                        else
                                            return <Tag color="gold"> {data.status} </Tag>
                                    }}
                                />
                                <Column title="S??? ??i???n tho???i" key="total"
                                    render={data => (
                                        <span> {data.phone ? data.phone : "0909123456"} </span>
                                    )}
                                />
                                <Column title="?????a ch???" dataIndex="place" key="place" />
                                <Column title="H??nh ?????ng" key="action" width="120px"
                                    render={action => (
                                        <div className="d-flex">
                                            <button onClick={() => { showDetail(action) }} className="btn-detail">Chi ti???t</button>
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