import { Table, Tag, Descriptions, Modal, message, Row, Statistic, Col, Popconfirm } from 'antd'
import axios from 'axios'
import { list } from 'postcss'
import { Fragment, useEffect, useState } from 'react'
import moment from "moment"

const { Column } = Table
const ListBill = () => {
    const [bill, setBill] = useState([])
    const [callAPI, setCallAPI] = useState(false)
    const [popKPI, setPopKpi] = useState(false)
    const [popStatus, setPopStatus] = useState(false);
    const [modalKPI, setModalKPI] = useState(false);
    const [modalExpire, setModalExpire] = useState(false);
    const [expireCar, setExpireCar] = useState([]);
    const [visible, setVisible] = useState(false)
    const [deleteVisible, setDeleteVisible] = useState(false)
    const [rentVisible, setRentVisible] = useState(false)
    const [billDetail, setBillDetail] = useState({
        startDate: '',
        endDate: ''
    })
    const [total, setTotal] = useState(0)
    const [totalAll, setTotalAll] = useState(0);
    const [listCar, setListCar] = useState([])
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
    const [render, setRender] = useState(0)
    const onSubmitRent = (detail) => {
        const data = {
            status: 'In progress'
        }
        try {
            axios.put(`https://mighty-meadow-74982.herokuapp.com/bill/admin/confirm/${detail}`, data)
                .then(res => {
                    if (res.data.status === 'SUCCESS') {
                        message.success('Cập nhật thành công')
                        setRentVisible(false)
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
    useEffect(() => {
        try {
            axios.get('https://mighty-meadow-74982.herokuapp.com/bill')
                .then(res=> {
                    let totalPrice = 0;
                    res.data.data.map(item => {
                        if(new Date() >= new Date(item.endDate) && item.status !== "Done") {
                            setExpireCar([...expireCar, item])
                        }
                        if(item.status !== "Waiting for admin") {
                            totalPrice += item.total;
                        }
                    });
                    setTotalAll(totalPrice);
                    setBill(res.data.data);
                })
        } catch (error) {
            console.log(error)
        }
    },[render])

    useEffect(() => {
        if(expireCar) {
            setPopStatus(true)
        }
    }, [JSON.stringify(expireCar)])

    const onConfirmKPI = () => {
        setModalKPI(true);
        setPopKpi(false);
    }

    const onCancelKPI = () => {
        setPopKpi(false);
    }

    const onConfirmUpdateBill = () => {
        setModalExpire(true)
        setPopStatus(false)
    }

    const onCancelUpdateBill = () => {
        setPopStatus(false)
    }

    const handleKPIOK = () => {
        const insertKPI = {
            total: totalAll || 0,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            percentResult: totalAll/100000000
        }
        axios.post("https://mighty-meadow-74982.herokuapp.com/bill/KPI", insertKPI)
        .then(res => {
            message.success("Chốt sổ thành công")
        })
        .catch(e => message.error("Chốt sổ thất bại, đã có lỗi xảy ra"))
        setModalKPI(false);
        setPopKpi(false)
    }

    const handleKPICancel = () => {
        setModalKPI(false);
        setPopKpi(false);
    }

    const handleUpdateOK = () => {
        const status = {
            status: "Done"
        }
        expireCar.map(bill => {
            axios.put(`https://mighty-meadow-74982.herokuapp.com/bill/admin/confirm/${bill.idBill}`, status)
            .then(res => {
                console.log(res);
                setModalExpire(false);
                setPopStatus(false)
            })
            .catch(e => console.log(e))
        })
    }

    const handleCancelUpdate = () => {
        setModalExpire(false);
        setPopStatus(false);
    }

    useEffect(() => {
        const currentTime = new Date();
        const lastDayOfMonth = new Date(currentTime.getFullYear(),currentTime.getMonth(),0);
        if(Math.round(currentTime - lastDayOfMonth) >= 0) {
            console.log(Math.round(currentTime - lastDayOfMonth))
            setPopKpi(true);
        }   
    },[render])
    
    return(
        <div className="container compo">
            <div className="row">
            <h4 className="mt-5 mb-5">Bảng lịch sử hóa đơn</h4>
            <Popconfirm 
                title="Đã đến ngày cuối trong tháng, bạn muốn chốt sổ chứ"
                visible={popKPI}
                onConfirm={onConfirmKPI}
                onCancel={onCancelKPI}
            >
            </Popconfirm>

            <Popconfirm 
                title="Có hóa đơn đến hạn, bạn muốn duyệt chứ"
                visible={popStatus}
                onConfirm={onConfirmUpdateBill}
                onCancel={onCancelUpdateBill}
            >
            </Popconfirm>
        
            <Modal width={1000} footer={false} visible={visible} onCancel={()=>setVisible(false)}>
                <Descriptions title="Chi tiết đơn đặt" bordered>
                    <Descriptions.Item label="Số điện thoại KH" >
                        {billDetail.phone?<span>{billDetail.phone}</span>:<span>0909123456</span>}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {billDetail.status === "Waiting for admin"?<Tag color="blue"> {billDetail.status} </Tag>
                    : billDetail.status === "Done" ? <Tag color="red"> {billDetail.status} </Tag> : <Tag color="gold"> {billDetail.status} </Tag>}
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
                                <h6>Bạn có chắc muốn huỷ đơn đặt xe của khách?</h6>
                                <p className="mb-5">Nếu đồng ý hãy nhấn Ok </p>
                                <div className="d-flex btn-confirm-container" style={{ borderTop: '1px solid #eee' }}>
                                    <button className="btn-delete-rent" onClick={()=>setDeleteVisible(false)}>Đóng</button>
                                    <button className="btn-submit-rent ml-2" onClick={()=>onDeleteBill(billDetail.idBill)}>Đồng ý</button>
                                </div>
                            </Modal>
                            <Modal visible={rentVisible} footer={false} onCancel={() => setRentVisible(false)}>
                                <h6>Bạn có chắc muốn cho thuê?</h6>
                                <p className="mb-5">Nếu đồng ý hãy nhấn Ok </p>
                                <div className="d-flex btn-confirm-container" style={{ borderTop: '1px solid #eee' }}>
                                    <button className="btn-delete-rent" onClick={()=>setRentVisible(false)}>Đóng</button>
                                    <button className="btn-submit-rent ml-2" onClick={()=>onSubmitRent(billDetail.idBill)}>Đồng ý</button>
                                </div>
                            </Modal>
                            <button onClick={() => setRentVisible(true)} className="btn-submit-rent">Xác nhận cho thuê</button>
                            <button onClick={() => setDeleteVisible(true)} className="btn-delete-rent">Huỷ đơn đặt</button>
                        </div>
                    }
            </Modal>

            <Modal
                visible={modalKPI}
                className="container"
                onOk={handleKPIOK}
                onCancel={handleKPICancel}
            >
                <h4>Chốt sổ doanh thu tháng {new Date().getMonth()}</h4>
                <Row gutter={32}>
                    <Col span={8}>
                        <Statistic title="Doanh thu hiện tại" value={totalAll}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Tháng hiện tại" value={new Date().getMonth()}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Chỉ tiêu đặt ra" value={100000000}/>
                    </Col>
                    <Col span={8}>
                        <Statistic title="Phần trăm doanh số" value={totalAll/100000000 * 100}/>
                    </Col>
                </Row>
            </Modal>

            <Modal
                visible={modalExpire}
                width={700}
                className="container"
                onOk={handleUpdateOK}
                onCancel={handleCancelUpdate}
            >
                <h4>Danh sách hóa đơn đến hạn</h4>
                <Table
                    dataSource={expireCar}
                >
                    <Column title="Mã hóa đơn" dataIndex="idBill" render={id => id.substr(0,5)}/>
                    <Column title="Mã KH" dataIndex="idUser" render={id => id.substr(0,5)}/>
                    <Column title="Ngày kết thuc" dataIndex="endDate" render={time => moment(time).format("YYYY-MM-DD hh:mm")}/>
                    <Column title="Tổng tiền" dataIndex="total" render={total => total + "VND"}/>
                    <Column title="Số điện thoại" dataIndex="phone"/>
                </Table>
            </Modal>

            <Table
                    bordered
                    dataSource={bill}
                >
                    <Column title="Ngày nhận" dataIndex="startDate" key="startDate" />
                    <Column title="Ngày trả" dataIndex="endDate" key="endDate" />
                    <Column title="Trạng thái" key="status"
                        render={data => {
                            if (data.status === "Waiting for admin")
                                return <Tag color="blue"> {data.status} </Tag>
                            if (data.status === "Done")
                                return <Tag color="red"> {data.status} </Tag>
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
            </div>
        </div>
    )
}
export default ListBill