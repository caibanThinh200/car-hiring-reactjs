import React, { Fragment, useEffect, useState } from 'react'
import { Carousel, Skeleton } from 'antd'
import '../../../styles/Home.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
const HomeContent = () => {
    const [listCar, setListCar] = useState([])
    const [listCar2, setListCar2] = useState([])

    useEffect(()=>{
        try {
            axios.get('https://mighty-meadow-74982.herokuapp.com/vehicle/1')
                .then(res=>setListCar(res.data.data))
            axios.get('https://mighty-meadow-74982.herokuapp.com/vehicle/2')
                .then(res=>setListCar2(res.data.data))
        } catch (error) {
            console.log(error)
        }
    },[])
    const contentStyle = {
        height: '320px',
        color: '#fff',
        lineHeight: '320px',
        textAlign: 'center',
        background: '#232425',
    };
    AOS.init({
        // Global settings:
        disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 120, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 400, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });
    return (
        <Fragment>
            <div className="main">
                <div className="banner-list">
                    <Carousel autoplay>
                        <div>
                            <h3 style={contentStyle}>1</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>2</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>3</h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>4</h3>
                        </div>
                    </Carousel>
                </div>
                <div className="container">
                    <div className="row introduction">
                        <h2 className="title">Giới thiệu</h2>
                        <div className="col-12">
                            <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias voluptatum repellat nam optio magni non, quaerat, delectus eos adipisci accusantium itaque laudantium earum accusamus ut ex nisi sed, vitae odit?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias voluptatum repellat nam optio magni non, quaerat, delectus eos adipisci accusantium itaque laudantium earum accusamus ut ex nisi sed, vitae odit?</p>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row service">
                        <div className="col-md-6 col-sm-12" data-aos="fade-right">
                            <h3 id="reason"><span>4</span>Lý do chọn SGVA</h3>
                            <div className="row">
                                <div className="col-6">
                                    <div className="image-box">
                                        <img src={process.env.PUBLIC_URL + '/images/i.jpg'} alt="" />
                                        <p>1. Hợp động rõ ràng</p>
                                    </div>
                                    <div className="image-box">
                                        <img src={process.env.PUBLIC_URL + '/images/c.jpg'} alt="" />
                                        <p>2. Hỗ trợ mọi lúc</p>
                                    </div>
                                </div>
                                <div className="col-6 box-2">
                                    <div className="image-box">
                                        <img src={process.env.PUBLIC_URL + '/images/h.jpg'} alt="" />
                                        <p>3. Giao xe tận tay</p>
                                    </div>
                                    <div className="image-box">
                                        <img src={process.env.PUBLIC_URL + '/images/j.jpg'} alt="" />
                                        <p>4. Ưu đãi về giá</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12" data-aos="fade-left">
                            <div className="contact">
                                <h3>Bạn cần thuê xe?</h3>
                                <div className="form">
                                    <input type="text" placeholder="Chọn loại xe" />
                                    <button>Tiếp tục</button>
                                    <div className="favourable">
                                        <p>Ưu đãi thành viên</p>
                                        <ul>
                                            <li>Giàm 10% cho lần đầu đặt xe với tài khoản thành viên</li>
                                            <li>Tặng 200k phí xăng dầu với hợp đồng trên 3 ngày</li>
                                            <li>sủa sủa sủa</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" data-aos="fade-up">
                    <div className="row part-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <h4>Dòng xe cao cấp</h4>
                                    <Swiper
                                    spaceBetween={10}
                                    slidesPerView={2}
                                    breakpoints={{
                                        "640": {
                                            "slidesPerView": 2,
                                            "spaceBetween": 10
                                          },
                                          "968": {
                                            "slidesPerView": 4,
                                            "spaceBetween": 20
                                          },
                                          "1224": {
                                            "slidesPerView": 5,
                                            "spaceBetween": 20
                                          },
                                    }}
                                >
                                    {listCar.length?listCar.map(car=>(
                                        <SwiperSlide>
                                         <div className="card-swiper">
                                             <div className="card-swiper-img">
                                                 <img src={car.image} alt=""/>
                                             </div>
                                             <div className="card-swiper-body">
                                                <h6>{car.name}</h6>
                                                <p>Giá: {car.price} </p>
                                                <Link to={`/detail/${car.idVehicle}`}>Xem ngay</Link>
                                             </div>
                                         </div>
                                        </SwiperSlide>
                                        )):<Skeleton/>}
                                    </Swiper>
                                </div>
                                <div className="col-12">
                                    <h4>Những mấu xe mới nhất</h4>
                                    <Swiper
                                    spaceBetween={10}
                                    slidesPerView={2}
                                    grabCursor = {true}
                                    breakpoints={{
                                        "640": {
                                            "slidesPerView": 2,
                                            "spaceBetween": 10
                                          },
                                          "768": {
                                            "slidesPerView": 4,
                                            "spaceBetween": 20
                                          },
                                          "1024": {
                                            "slidesPerView": 5,
                                            "spaceBetween": 20
                                          },
                                    }}
                                >
                                    {listCar2.length?listCar2.map(car=>(
                                        <SwiperSlide>
                                         <div className="card-swiper">
                                             <div className="card-swiper-img">
                                                 <img src={car.image} alt=""/>
                                             </div>
                                             <div className="card-swiper-body">
                                                <h6>{car.name}</h6>
                                                <p>Giá: {car.price} </p>
                                                <Link to={`/detail/${car.idVehicle}`}>Xem ngay</Link>
                                             </div>
                                         </div>
                                        </SwiperSlide>
                                        )):<Skeleton/>}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ background: 'white' }}
                    data-aos="fade-up"
                    // data-aos-anchor-placement="bottom-bottom"
                    >
                    <div className="container">
                        <div className="row">
                            <h2 className="title">Dịch vụ tiêu chuẩn 5 sao</h2>
                        </div>
                        <div className="row part-1">
                            <div className="col-md-6 col-xs-12" style={{ padding: 0, overflow: 'hidden' }}>
                                <img id="img" src={process.env.PUBLIC_URL + '/images/1.jpg'} alt="" />
                            </div>
                            <div className="col-md-6 col-xs-12 text pl-4 pr-4">
                                <p>Trải nghiệm không gian sang trọng bên trong mẫu xe gia đình 16 chỗ Ford Transit Limousine là 1 sự thưởng thụ thật thoải mái trên những chuyến đi xa cùng gia đình, bạn bè.</p>
                                <div className="star">
                                    <span><i className="fas fa-star" /></span>
                                    <span><i className="fas fa-star" /></span>
                                    <span><i className="fas fa-star" /></span>
                                    <span><i className="fas fa-star" /></span>
                                    <span><i className="fas fa-star" /></span>
                                </div>
                                <div className="button">
                                    <button className="explore-btn">Khám phá ngay</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid part-3">
                    <div className="row">
                        <h2 className="title">Khách hàng nói gì về chúng tôi?</h2>
                    </div>
                    <div className="row" data-aos="fade-up"
                        // data-aos-anchor-placement="bottom-center"
                        >
                        <div className="col-12">
                            <Swiper
                                    spaceBetween={10}
                                    grabCursor
                                    slidesPerView={2}
                                    breakpoints={{
                                        "640": {
                                            "slidesPerView": 2,
                                            "spaceBetween": 10
                                          },
                                          "768": {
                                            "slidesPerView": 3,
                                            "spaceBetween": 20
                                          },
                                          "1024": {
                                            "slidesPerView": 4,
                                            "spaceBetween": 20
                                          },
                                    }}
                                >
                                <SwiperSlide>
                                    <div className="box">
                                        <div className="top-box">
                                            <img src={process.env.PUBLIC_URL + '/images/avt.jpg'} alt="" />
                                        </div>
                                        <div className="text-box">
                                            <h5>Châu Hiếu Nghĩa</h5>
                                            <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn trong suốt quá trình đọc sách. Kênh hỗ trợ đa dạng: Fanpage, Group, Messager, Email...</p>
                                        </div>
                                        <div className="bottom-box">
                                            <button>Đọc thêm</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box">
                                        <div className="top-box">
                                            <img src={process.env.PUBLIC_URL + '/images/avt.jpg'} alt="" />
                                        </div>
                                        <div className="text-box">
                                            <h5>Châu Hiếu Nghĩa</h5>
                                            <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn trong suốt quá trình đọc sách. Kênh hỗ trợ đa dạng: Fanpage, Group, Messager, Email...</p>
                                        </div>
                                        <div className="bottom-box">
                                            <button style={{ backgroundColor: 'greenyellow' }}>Đọc thêm</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box">
                                        <div className="top-box">
                                            <img src={process.env.PUBLIC_URL + '/images/avt.jpg'} alt="" />
                                        </div>
                                        <div className="text-box">
                                            <h5>Châu Hiếu Nghĩa</h5>
                                            <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn trong suốt quá trình đọc sách. Kênh hỗ trợ đa dạng: Fanpage, Group, Messager, Email...</p>
                                        </div>
                                        <div className="bottom-box">
                                            <button style={{ backgroundColor: 'cornflowerblue' }}>Đọc thêm</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="box">
                                        <div className="top-box">
                                            <img src={process.env.PUBLIC_URL + '/images/avt.jpg'} alt="" />
                                        </div>
                                        <div className="text-box">
                                            <h5>Châu Hiếu Nghĩa</h5>
                                            <p>Chúng tôi luôn sẵn sàng hỗ trợ bạn trong suốt quá trình đọc sách. Kênh hỗ trợ đa dạng: Fanpage, Group, Messager, Email...</p>
                                        </div>
                                        <div className="bottom-box">
                                            <button>Đọc thêm</button>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}
export default HomeContent;