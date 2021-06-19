import { React, Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import '../../../styles/Home.css'
const Footer = () => {
    const location = useLocation().pathname
    if (location.includes("admin") == false)
    return (
        <Fragment>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 column">
                            <h5>Về chúng tôi</h5>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, reprehenderit? Nostrum fugit sint maxime eius quae unde dolores assumenda? Assumenda iusto tempora maiores maxime deleniti vero, enim nulla pariatur veniam?</p>
                            <h5>Theo dõi chúng tôi</h5>
                            <div className="icon">
                                <span><i className="fab fa-facebook-square" /></span>
                                <span><i className="fab fa-twitter" /></span>
                                <span><i className="fab fa-instagram" /></span>
                                <span><i className="fab fa-skype" /></span>
                                <span><i className="fab fa-youtube" /></span>
                            </div>
                            <div className="mt-4">
                                <p>Đăng ký nhận thông báo mới nhất</p>
                                <div className="subcribe">
                                    <input id="email" type="text" placeholder="Nhập email" />
                                    <button id="subcribe">Đăng ký</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-12 column">
                            <h5>Liên kết</h5>
                            <div className="link">
                                <p href>Giới thiệu</p>
                                <p href>Tin tức</p>
                                <p href>Tuyển dụng</p>
                            </div>
                        </div>
                        <div className="col-md-2 col-sm-12 column">
                            <h5>Chính sách</h5>
                            <div className="policy">
                                <p href>Hoàn huỷ </p>
                                <p href>Sự cố và khiếu nại</p>
                                <p href>Ưu đãi</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-12 column">
                            <h5>Hỗ trợ</h5>
                            <div className="support">
                                <ul>
                                    <li><span><i className="fas fa-phone" />0909.956.627</span></li>
                                    <li><span><i className="far fa-envelope" />tnd.290800@gmail.com</span></li>
                                    <li><a style={{ color: 'white' }} href><span><i className="far fa-question-circle" />FAQ</span></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
    else return(
        <div></div>
    )
}
export default Footer;