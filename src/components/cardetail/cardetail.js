import React, { useEffect, useState } from 'react';
import '../../styles/CarDetail.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Rate } from 'antd';
import { BackTop, Image, Tag } from 'antd';


const Detail = () =>{
    let { id } = useParams();
    const [star,setStar] = useState(3)
    const[carDetail,setCarDetail] = useState({}) 
    const[comp,setComp] = useState([])

    
    useEffect(() => {
        try {
            axios.get(`https://mighty-meadow-74982.herokuapp.com/vehicle/detail/${id}`)
            .then(response => {
                setCarDetail(response.data.data)
                setComp(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])
    return(
        <div className="container details">
                <div className="card">
                    <div className="card__title">
                        <div className="icon d-flex">
                            <a href="/vehicles"><i className="fa fa-arrow-left" /></a>
                            <a href="/vehicles">Trở về chọn xe</a>
                        </div>
                        <h3>{comp.manufactorName}</h3>
                    </div>
                        <div className="card__body row">
                            <div className="half col-lg-6 col-sx-12" >
                                <div className="featured_text">
                                    <div className="featured_text-1">
                                        <h3>{carDetail.name}</h3>
                                        <p id="cate-detail">Loại xe: {comp.cateName} chỗ</p>
                                        <h5 id="price-detail" style={{ color: 'red'}}>{new Intl.NumberFormat().format(carDetail.price)} VND </h5>
                                    </div>
                                    <div className="featured_text-2">
                                        <Tag style={{padding:'5px 20px', fontSize:'18px'}} color="#F50">Hot</Tag>
                                    </div>
                                </div>
                                <div className="image">
                                    {carDetail.image?<Image
                                    src={carDetail.image}                                    
                                    />: <p>Loading...</p>}
                                </div>
                            </div>
                            <div className="half col-lg-6 col-sx-12">
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero voluptatem nam pariatur voluptate perferendis, asperiores aspernatur! Porro similique consequatur, nobis soluta minima, quasi laboriosam hic cupiditate perferendis esse numquam magni.</p>
                                </div>
                                    <h5>Hỗ trợ khách hàng</h5>
                                    <ul style={{fontSize:'large'}}>
                                        <li>Giao xe tận nhà cho khách hàng</li>
                                        <li>Xe được trang bị wifi tốc độ cao</li>
                                        <li>Thủ tục nhanh gọn, đặt cọc ít</li>
                                        <li>Hỗ trợ kiểm tra xe trước khi ký hợp đồng</li>
                                        <li>Hotline hỗ trợ tư vấn 24/7 - <span style={{color:'red'}}>0909.956.627</span></li>
                                    </ul>
                                    <span className="stock"><i className="fa fa-pen" />Còn trống</span>
                                <div className="reviews">
                                    <Rate value={star} onChange={star=>setStar(star)}/>
                                    <span>(0 reviews)</span>
                                </div>
                                <div className="pay">
                                    <button>Đặt ngay</button>
                                </div>  
                            </div>
                            <div className="Policy">
                                <h4>Thông tin thuê xe</h4>
                                <h5>Chính sách</h5>
                                <p> <i class="fal fa-gas-pump"></i>Return the fuel as received</p>
                                <p> <i class="fal fa-clock"></i>Usage of up to 24 hours per rental day</p>
                                <p> <i class="fal fa-clipboard-list"></i>Rental Requirements</p>
                                <ul>
                                    <li>ID card (KTP or passport)</li>
                                    <li>Driver’s License (SIM A)/International Driving Permit</li>
                                    <li>Others (if provider requires additional verification)</li>
                                </ul>
                                <p><i class="far fa-money-bill-wave-alt"></i> Áp dụng hoàn tiền</p>
                                <p><i class="fal fa-calendar-alt"></i>Đổi lại lịch khả dụng</p>
                                <h5>Tiện ích</h5>
                                <p><i class="fal fa-shield-check"></i> Vehicle insurance</p>
                                <p><i class="fal fa-history"></i>24/7 Traveloka Customer Service</p>
                                <h5>Chính sách</h5>
                                <p>Rental Requirements</p>
                                <h5>Before Pick-up</h5>
                                <ol>
                                    <li>The driver must share with the provider a photo of their identity card (KTP or Passport).</li>
                                    <li>The driver must share with the provider a photo of their driver’s license (SIM A) or International Driving Permit.</li>
                                    <li>The driver must pay a deposit via cash, transfer, or credit card to the provider before the rental begins.The amount will be informed by the provider after booking is finished.</li>
                                    <li>All documents presented must be original, complete, valid, and match the name used in the booking.</li>
                                </ol>
                                <h5>Dịch vụ thuê xe</h5>
                                <ol>
                                    <li>Hãy chắc chắn đọc các yêu cầu về thuê xe và tài xế của nhà cung cấp, sau đó đặt xe và thanh toán tiền thuê xe. </li>
                                    <li>Sau khi thanh toán của bạn được xác nhận, hãy điền đầy đủ thông tin được yêu cầu từ nhà cung cấp xe.</li>
                                    <li>Sau khi nhà cung cấp xác minh các yêu cầu, hãy kiểm tra tình trạng xe với nhân viên của nhà cung cấp.</li>
                                    <li>Đọc và ký thỏa thuận thuê xe của nhà cung cấp, sau đó bạn có thể sử dụng dịch vụ.</li>
                                </ol>
                            </div> 
                        </div>
                    <div className="card__footer">
                        <div className="recommend">
                            <p>Liên hệ với chúng tôi</p>
                            <h3>0909.956.627</h3>
                        </div>
                        <div className="action">
                            <button type="button">Đặt ngay</button>
                        </div>
                    </div>
            </div>
            <BackTop duration='10'/>
      </div>    
    );
}

export default Detail;