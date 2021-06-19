import { data } from 'autoprefixer';
import React, { Component, Fragment,useEffect, useState } from 'react';
import '../styles/Agreement.css'
import CarDetail  from './carDetail'
import UserDetail from './userDetail'


    const Agreement = () =>{

        const [carDetails,setCarDetail] = useState ({});

        const [userDetails,setUserDetail]= useState ({});
        useEffect( ()=>{
            getCar();
            getUser();
        },[]);


        const getCar = async ()=> {
            const response = await fetch('https://mighty-meadow-74982.herokuapp.com/vehicle/detail/041b8331-72aa-4290-8357-60c223acc332');
            const data = await response.json();
            console.log(data)
            setCarDetail(data.data)
        } 

        const getUser = async ()=>{
            const res = await fetch('https://mighty-meadow-74982.herokuapp.com/customer/77947fe6-bcf8-4ef6-aceb-62c5278f5681');
            const info = await res.json();
            console.log(info)
            setUserDetail(info.data)
        }

            return(
            <Fragment>
                <div className="agreeForm"> 
                    <h3>Thỏa Thuận Thuê Xe</h3>
                    <div className="header1">
                        <h5>Mã số :</h5>
                        <h6>Ngày:</h6>
                    </div>
                    <div className="content">
                        <h3>Chủ xe</h3> 
                        <h5>Brownstone Group of Companies - P.O.BOX CB 13248</h5>
                        <CarDetail car={carDetails} />
                        <h3>Người thuê</h3>
                        <UserDetail user={userDetails}/>
                        <p>Bên thuê xác định đây là thông tin hợp pháp trên giấy tờ và sẵn sàng thực hiện mọi hành vi pháp lý</p>
                        <h3>Điều kiện</h3>
                        <p>Chủ xe đã xác định tuân thủ mọi tiêu chuẩn , điều kiện xe để thực hiện dịch vụ cho thuê xe</p>
                        <h3>Tiêu chuẩn</h3>
                        <p>Người thuê cung cấp đủ mọi yêu cầu để đáp ứng điều kiện thuê xe của chúng tôi</p>
                        <h3>Thời hạn thuê</h3>
                        <p>Người thuê xe xác nhận thuê chiếc xe sau khi đã qua đánh giá tình trạng trên</p>
                        <ol>
                            <li>Ngày thuê: _______________________________ Lúc: ____________________(a.m. / p.m.)</li>
                            <li>Ngày trả:  _______________________________ Lúc: ____________________(a.m. / p.m.)</li>
                        </ol>
                        <h3>Bảo hiểm</h3>
                        <p>Người thuê phải đảm bảo chịu trách nhiệm hoàn toàn cho mọi vấn đề pháp lý khi xảy ra sự cố trong lúc thuê xe </p>
                        <h3>Trả xe</h3>
                        <p>Người thuê xác nhận sẽ trả xe về đúng theo tình trạng xe trước khi thuê vào:  _______________</p>
                        <h3>Cam kết</h3>
                        <div className="Agreement">
                        <ol>
                        <li><p>Ký vào ngày __________________</p></li>
                        <li><p>Chủ xe: _____________________________</p></li>
                        <li><p>Người thuê:_____________________________</p></li>
                        </ol>
                        </div>
                    </div>
                </div>
                
            </Fragment>
        );
    }
export default Agreement