import React, { Fragment, useEffect, useState } from 'react'
import '../../../styles/hiring.css';
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import axios from 'axios'
import {notification, Modal, Slider, Skeleton, Result, Input} from 'antd'
import {MenuUnfoldOutlined, ReloadOutlined} from '@ant-design/icons';
import {
    LoadingOutlined,
} from '@ant-design/icons';
import { collapsedCategory, getListCarByPrice, getListCarFromHighPrice, getListCarFromLowPrice, setList, searchCar, loadList } from '../../../action/car';
import result from 'autoprefixer/data/prefixes';
const {Search} = Input
const Hiring = () => {
    const redirect = () =>{
        Modal.warning({
            title: 'Vui lòng đăng nhập',
            content: (
              <div>
                  <a href="/login">Đăng nhập</a>
              </div>
            ),
            onOk() {window.location="/login"},
          });        
    }
    // cai do dau vay ditmemay, cai css cai payment kia css lam gi
    const [listCar, setListCar] = useState({
        cars: [],
        defaultList: [],
    })
    const dispatch = useDispatch()
    const collapsed = useSelector(state=>state.car.collapsed)
    const list = useSelector(state=> state.car.listCar)
    let empty = localStorage.getItem("cart")
    let cart = [];
    const token = localStorage.getItem("token")
    empty?cart = empty.split(","):cart=[];
    const [total, setTotal] = useState();
    const [pagination, setPagination] = useState(1)
    const handlePagePrev = newPage => {
        newPage = pagination - 1;
        setPagination(newPage);
    }
    const handlePageNext = newPage => {
        newPage = pagination + 1
        setPagination(newPage);
    }
    const [priceRange, setPriceRange] = useState([])
    //Get how many pages
    const page = []
    for (var i = 1; i <= total; i++) {
        page.push(i)
    }

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

    const addToCart = (idVehicle, name, price, quantity, image) =>{
        const car = {
            idVehicle,
            name,
            price,
            quantity,
            image,
        }
        cart.push({...car, count: 1})
        notification.success({
            message: ' Thành công',
            description:
              `Đã thêm xe ${name} vào đơn đặt xe`,
            placement: 'bottomRight'
          });
        localStorage.setItem("cart",JSON.stringify(cart))
    }


    useEffect(() => {
        try {
            localStorage.getItem("cart")?cart = localStorage.getItem("cart"):cart = [];
            axios.get("https://mighty-meadow-74982.herokuapp.com/vehicle/")
            .then(response => {
                setTotal(Math.ceil(response.data.data.length / 12))
                let filter = response.data.data.filter(item=>item.quantity>0)
                const action = setList(filter, filter)
                dispatch(action)
                setListCar({
                    cars: response.data.data
                })
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    const formatMonney = (val) => {
        let num = 0;
        let oldVal = val ? val.toString() : "";
        if (oldVal === "" || oldVal === 0) {
            num = 0;
        } else {
            num = isNaN(parseInt(oldVal.replace(/,/g, '')).toString()) ? 0 : parseInt(oldVal.replace(/,/g, ''));
            num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return num;
    };
    const getPriceRange = (value) =>{
        const action = getListCarByPrice(value)
        dispatch(action)
    }
    const sortUp = ()=>{
        const action = getListCarFromLowPrice(list)
        dispatch(action)
    }
    const sortDown = ()=>{
        const action = getListCarFromHighPrice(list)
        dispatch(action)
    }
    const changeStatus = () =>{
        const action = collapsedCategory()
        dispatch(action)
    }
    const onSearch = (value)=>{
        const action = searchCar(value)
        dispatch(action)
    }
    const loadListCar = () =>{
        const action = loadList()
        dispatch(action)
    }
    const marks = {
        0: {
            label: <p>0</p>
        },
        2500000:{
            label: <p>2.500.000</p>
        },
        5000000:{
            label: <p>5.000.000</p>
        },
    }
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="r">
                    <div className="filter">
                    <Search 
                        size="large" 
                        placeholder="Nhập tên xe cần tìm" 
                        allowClear
                        style={{width:'100%'}}
                        // enterButton={<i class="far fa-search"></i>}
                        onSearch = {onSearch}
                    />
                    <div className="reload">
                        <button onClick={()=>loadListCar()}><i class="far fa-redo"> </i> Mặc định</button>
                    </div>
                    </div>
                    <div className="filter-price">
                        <div className="container-fluid" style={{paddingTop:'12px'}}>
                            <div className="row">
                                <div className="col-lg-2">
                                    <div className="btn-collapsed">
                                        {collapsed==false?<h5>Thu nhỏ</h5>:<h5>Phóng to</h5>}
                                        <button onClick={()=>changeStatus()}><i class="fal fa-sliders-h"></i></button>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="sort-price">
                                        <h5>Sắp xếp theo</h5>
                                        <button onClick={()=>sortUp()}>Thấp đến cao <i class="fal fa-level-up"></i></button>
                                        <button onClick={()=>sortDown()}>Cao đến thấp <i class="fal fa-level-down"></i></button>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="show-price">
                                        <p>Từ {priceRange[0] || 0}</p>
                                        <p>Đến {priceRange[1] || 5000000}</p>
                                    </div>
                                    <Slider
                                        // marks={marks}
                                        range 
                                        tooltipVisible={false}
                                        defaultValue={[0,5000000]} 
                                        step={100000} 
                                        min={0} 
                                        max={5000000} 
                                        onChange={(value)=>{
                                            getPriceRange(value);
                                            setPriceRange(value)
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row hiring">
                        {/* {!list.length?<Skeleton style = {{ marginTop:'40px'}}/>:<span></span>} */}
                        {list.length?list.map((items) => (
                            !items ? <LoadingOutlined /> : (
                                <div style={{ paddingBottom: '15px' }} className="col-lg-4 col-md-6 col-xl-3">
                                    <div className="box">
                                        {items.image? <div className="car--image">
                                            <img src={items.image} alt=""/>
                                            <Link to={`/detail/${items.idVehicle}`} className="back-face">
                                                <span>Xem chi tiết</span>
                                            </Link>
                                        </div>:
                                            <p className="car-image"><LoadingOutlined style = {{fontSize:'30px', color:'#fff'}} /></p>}
                                        <div className="information">
                                            <Link to={`/detail/${items.idVehicle}`}><h6>{items.name}</h6></Link>
                                            <p>Giá theo ngày: <span style={{ color: 'red', marginLeft: '5px' }}>{formatMonney(items.price)} VND </span></p>
                                        </div>
                                        <div className="d-flex d">
                                            <button onClick={()=>{token?addToCart(items.idVehicle, items.name, items.price, items.quantity, items.image, items.count):redirect()}} className="btn btn-outline-danger"><i class="fal fa-plus"></i> Thêm</button>
                                            <Link to={token?`/${items.idVehicle}/payment`:'/login'} className="order">Đặt  ngay</Link>
                                        </div>
                                    </div>
                                </div>) 
                            )):<div className="sort-result">
                                {listCar.cars.length?<Result  status="404" title="Không tìm thấy xe" subTitle="Quý khách vui lòng chọn loại xe khác"/>:<span></span>}
                            </div>}
                    </div>       
                    <div className="row">
                        {list.length?<div className="col-12 pagination-button">
                            <button className="btn-prev" disabled={pagination === 1} onClick={handlePagePrev}><i class="fal fa-angle-left"></i></button>
                            {page.map(items => (
                                <button disabled={items === pagination} onClick={() => {
                                    setPagination(parseInt(items))
                                }} className="btn-num">{items}</button>
                            ))}
                            <button className="btn-next" disabled={pagination === total} onClick={handlePageNext}><i class="fal fa-angle-right"></i></button>
                        </div>:<span></span>}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Hiring;