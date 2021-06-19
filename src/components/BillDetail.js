import React, {useState} from 'react'
import '../styles/BillDetail.css'
import { Modal, Button } from 'antd';

    const BillDetail=({car,index,user}) =>{


        const [modalVisible, setModalVisible] = useState(false);
        const showModal = () => {
            setModalVisible(true);
          };
        
        
        
          const handleClose = () => {
            setModalVisible(false);
          };

        return(
            <tr>
            <th scope="row">{index +1}</th>
            <td>{car.name}</td>
            <td>{car.price}</td>
            <td>____</td>
            <td >
              
            <button  className="btn btn-outline-danger"  onClick={showModal}>Xem Đơn Đặt</button>
                <Modal  className="bill-detail" title={<span style={{fontWeight:'600'}}>Đơn Đặt Xe</span>} visible={modalVisible} onCancel={handleClose} footer={null}>
                    <div className="bill-detail">
                        <div style={{boxShadow:'1px 0',padding:'0 10px'}} className="user-detail">
                          <h6>User info</h6>
                        <p>Họ tên khách hàng: {user.fullname}</p>
                        <p>sdt: {user.phoneNum}</p>
                        <p>Email: {user.mail}</p>
                        <p>Căn cước công dân: {user.cmnd}</p>
                        <p>Bằng lái: {user.license} </p> 
                        </div>  
                        <div style={{boxShadow:'1px 0',padding:'0 10px'}} className="car-detail">
                          <h6>Vehicle Info</h6>
                        <img  src={process.env.PUBLIC_URL + '/images/vehicle.jpg'}/>
                        <p>Tên xe: {car.name}</p>
                        <p>Giá: {car.price} VNĐ</p>
                        </div>   
                        <div  className="payment">
                        <h6>Payment</h6>
                        <p>Ngày đặt: 01/09/1985 </p>
                        <p>Ngày trả: 06/09/1985 </p>
                        <p>Ngày thuê: 5 ngày</p>
                        <p>Tổng tiền: {car.price *5} VNĐ</p> 
                        </div>
                    </div>
                </Modal>
            </td>
          </tr>
        );
    }

    
export default BillDetail;