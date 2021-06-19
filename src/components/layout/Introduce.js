import autoprefixer from 'autoprefixer';
import React from 'react'
import '../../styles/Introduce.css'
const Introduce = () => {
    return (
        <div>
            <div>
                <div className="titler">
                    <h1>Giới thiệu</h1>
                </div>
                <div className="container">
                    <div style={{marginLeft:'70px'}} className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12 text-center">
                            <div className="image">
                                <div className="face front">
                                  <img  src={process.env.PUBLIC_URL + '/images/car.png'}/>                                 
                                    <h3>Nhiều Lựa Chọn</h3>
                                </div>
                                <div className="face back">
                                    <p>Hàng trăm loại xe đa dạng ở nhiều địa điểm trên cả nước, phù hợp với mọi mục đích của bạn.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 text-center">
                            <div className="image">
                                <div className="face front">
                                <img  src={process.env.PUBLIC_URL + '/images/tag.png'}/>
                                    <h3>Tiết Kiệm</h3>
                                </div>
                                <div className="face back">
                                    <p>Giá thuê được niêm yết công khai và rẻ hơn 10% so với giá truyền thống khi bạn là thành viên
              của chúng tôi.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 text-center">
                            <div className="image">
                                <div className="face front">
                                <img  src={process.env.PUBLIC_URL + '/images/timer.png'}/>
                                    <h3>Nhanh Gọn</h3>
                                </div>
                                <div className="face back">
                                    <p>Dễ dàng tìm kiếm, so sánh và đặt chiếc xe như ý với chỉ vài click chuột</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 text-center">
                            <div className="image">
                                <div className="face front">
                                <img  src={process.env.PUBLIC_URL + '/images/checked.png'}/>
                                    <h3>Tin Cậy</h3>
                                </div>
                                <div className="face back">
                                    <p>Các xe đều có thời gian sử dụng dưới 3 năm và được bảo dưỡng thường xuyên</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 text-center">
                            <div className="image">
                                <div className="face front">
                                <img  src={process.env.PUBLIC_URL + '/images/shield.png'}/>
                                    <h3>Bảo Hiểm</h3>
                                </div>
                                <div className="face back">
                                    <p>An tâm với các gói bảo hiểm vật chất và tai nạn trong suốt quá trình thuê xe</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 text-center">
                            <div className="image">
                                <div className="face front">
                                <img  src={process.env.PUBLIC_URL + '/images/head.png'}/>
                                    <h3>Hổ Trợ 24/7</h3>
                                </div>
                                <div className="face back">
                                    <p>Có nhân viên hỗ trợ khách hàng trong suốt quá trình thuê xe</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Introduce;